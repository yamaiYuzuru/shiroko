let {levelSchema} = require('../models');

module.exports = class LevelClass {

    static async appendXp(userId, xp) {
        if (!userId) throw new TypeError("An user id was not provided.");
        if (xp === 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("An amount of xp was not provided/was invalid.");

        const user = await levelSchema.findOne({ userID: userId });

        if (!user) {
            const newUser = await levelSchema.create({
                userID: userId,
                xp: xp,
                level: Math.floor(0.1 * Math.sqrt(xp))
            });

            await newUser.save().catch(e => console.log(`Failed to save new user.`));

            return (Math.floor(0.1 * Math.sqrt(xp)) > 0);
        }

        user.xp += parseInt(xp, 10);
        user.level = Math.floor(0.1 * Math.sqrt(user.xp));
        user.lastUpdated = new Date();

        await user.save().catch(e => console.log(`Failed to append xp: ${e}`) );

        return (Math.floor(0.1 * Math.sqrt(user.xp -= xp)) < user.level);
    }

    static async fetch(userId, fetchPosition = false) {
        if (!userId) throw new TypeError("An user id was not provided.");

        const user = await levelSchema.findOne({userID: userId});
        if (!user) return false;

        if (fetchPosition === true) {
            const leaderboard = await levelSchema.find({}).sort([['xp', 'descending']]).exec();

            user.position = leaderboard.findIndex(i => i.userID === userId) + 1;
        }

        user.cleanXp = user.xp - this.xpFor(user.level);
        user.cleanNextLevelXp = this.xpFor(user.level + 1) - this.xpFor(user.level);

        return user;
    }

    static xpFor (targetLevel) {
        if (isNaN(targetLevel) || isNaN(parseInt(targetLevel, 10))) throw new TypeError("Target level should be a valid number.");
        if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10);
        if (targetLevel < 0) throw new RangeError("Target level should be a positive number.");
        return targetLevel * targetLevel * 100;
    }
};
