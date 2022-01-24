/**
 * API requets to https://aoeiv.net/#api
 */
import axios from "axios";

export default {
    getLeaderboard(leaderboard_id, count, callback, error) {
        axios
            .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + leaderboard_id + '&start=0&count=' + count)
            .then(response => callback(response.data.leaderboard))
            .catch(err => error(err));
    },
    async searchLeaderboard(leaderboard_id, name) {
        return axios
            .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + leaderboard_id + '&start=0&count=1000&search=' + name);
    },
    async getPlayerLeaderboard(leaderboard_id, profile_id) {
        return axios
            .get('https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=' + leaderboard_id + '&start=0&count=' + 1 + '&profile_id=' + profile_id);
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
    },
    getSteamAvatar(profile_ids, callback) {
        axios
            .post('https://aoe4world.com/api/v0/avatars/', {'profile_ids': [profile_ids]}, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(response => callback(response.data));
    }
}
