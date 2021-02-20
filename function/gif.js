'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
module.exports = class gif {
    constructor() {
        this.baseURL = "https://shiroko.ml/cdn/";
    }

    get getHappy() {
        return this.baseURL + "smile/smile" + Math.floor(Math.random() * 20) + ".gif";
    }

    get getCry() {
        return this.baseURL + "cry/cry" + Math.floor(Math.random() * 20) + ".gif";
    }

    get getBully() {
        return this.baseURL + "bully/bully" + Math.floor(Math.random() * 20) + ".gif";
    }

    get getCuddle() {
        return this.baseURL + "cuddle/cuddle" + Math.floor(Math.random() * 20) + ".gif";
    }

    get getHug() {
        return this.baseURL + "hug/hug" + Math.floor(Math.random() * 20) + ".gif";
    }

    get getKill() {
        return this.baseURL + "kill/kill" + Math.floor(Math.random() * 20) + ".gif";
    }

    get getKiss() {
        return this.baseURL + "kiss/kiss" + Math.floor(Math.random() * 20) + ".gif";
    }

    get getBite() {
        return this.baseURL + "bite/bite" + Math.floor(Math.random() * 20) + ".gif";
    }
};