/**
 * API requets to https://aoeiv.net/#api
 */
import axios from "axios";

export default {
    getLeaderboard(leaderboard_id, count, callback) {
        axios
            .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + leaderboard_id + '&start=0&count=' + count)
            .then(response => callback(response));
    },
    async searchLeaderboard(leaderboard_id, name) {
        return axios
            .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + leaderboard_id + '&start=0&count=1000&search=' + name)
    },
    getPlayerLeaderboard(leaderboard_id, profile_id, callback) {
        axios
            .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + leaderboard_id + '&start=0&count=' + 1 + '&profile_id=' + profile_id)
            .then(response => callback(response));
    },
    getGameHistory(profile_id, callback) {
        axios
            .get('https://aoeiv.net/api/player/matches?game=aoe4&count=1000&profile_id=' + profile_id)
            .then(response => {
                callback(response.data)
            });
    },
    getRatingHistory(leaderboard_id, profile_id, callback) {
        axios
            .get('https://aoeiv.net/api/player/ratinghistory?game=aoe4&leaderboard_id=' + leaderboard_id + '&count=10000&profile_id=' + profile_id)
            .then(response => callback(response));
    },
    getConstantes(language, callback) {
        axios
            .get('https://aoeiv.net/api/strings?game=aoe4&language=' + language)
            .then(response => callback(response));
    }
}
