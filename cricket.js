let teamA = ['player 1A', 'player 2A', 'player 3A', 'player 4A', 'player 5A', 'player 6A', 'player 7A', 'player 8A', 'player 9A', 'player 10A', 'player 11A'];
let teamB = ['player 1B', 'player 2B', 'player 3B', 'player 4B', 'player 5B', 'player 6B', 'player 7B', 'player 8B', 'player 9B', 'player 10B', 'player 11B'];

// let teamA = ['player 1A', 'player 2A', 'player 3A', 'player 4A', 'player 5A'];
// let teamB = ['player 1B', 'player 2B', 'player 3B', 'player 4B', 'player 5B'];

teamAScore = 0;
teamBScore = 0;

teamAPlayerScoreCards = {};
teamBPlayerScoreCards = {};
teamAScoreCard = { wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0 };
teamBScoreCard = { wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0 };

availableScores = [0, 1, 2, 3, 4, 5, 6, 'wb', 'nb', 'out'];
overs = 20;

availableOverA = overs * 6;
availableOverB = overs * 6;

availableTeamAPlayers = JSON.parse(JSON.stringify(teamA));
availableTeamBPlayers = JSON.parse(JSON.stringify(teamB));

teamABowlers = JSON.parse(JSON.stringify(teamA)).splice(6, 4);
teamBBowlers = JSON.parse(JSON.stringify(teamB)).splice(6, 4);

teamABowlersScoreCard = {};
teamBBowlersScoreCard = {};

teamABowlingData = { wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0, wickets: 0, score: 0, balls: 0 };
teamBBowlingData = { wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0, wickets: 0, score: 0, balls: 0 };

for(i=0; i < teamBBowlers.length; i++) {
    teamBBowlersScoreCard[teamBBowlers[i]] = { score: 0, balls: 0, wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0, wickets: 0 };
    teamABowlersScoreCard[teamABowlers[i]] = { score: 0, balls: 0, wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0, wickets: 0 };
}

currentlyPlaying = 'teamA';
currentlyBowlingPlayer = '';
interval = null;

previousBall = '';

teamAPlayerScoreCards[availableTeamAPlayers[0]] = { score: 0, scoreCards: [], balls: 0, wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0, wicketBy: '' };
teamBPlayerScoreCards[availableTeamBPlayers[0]] = { score: 0, scoreCards: [], balls: 0, wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0, wicketBy: '' };

document.body.onclick = function (e) {
    if (window.event) {
        e = event.srcElement;
    }
    else {
        e = e.target;
    }

    if (e.className && e.className.indexOf('stop') != -1) {
        clearInterval(interval);
        document.getElementById('start').className = "start"
        document.getElementById('stop').className = "stoped"
    }

    if (e.className && e.className.indexOf('start') != -1) {
        document.getElementById('start').className = "started"
        document.getElementById('stop').className = "stop"
        if (document.getElementById('start').className === 'started') {
            document.getElementById('teamA').className = "displayTeamA column";
            interval = setInterval(() => {
                if (currentlyPlaying === 'teamA' && availableTeamAPlayers.length > 1 && availableOverA > 0) {

                    if(availableOverA % 6 === 0 && (previousBall !== 'wb' || previousBall !== 'nb')) {
                        currentlyBowlingPlayer = teamBBowlers.shift();
                        teamBBowlers.push(currentlyBowlingPlayer);
                    }

                    var score = availableScores[Math.floor(Math.random() * availableScores.length)];
                    previousBall = score;
                    teamAPlayerScoreCards[availableTeamAPlayers[0]].scoreCards.push({ score: score, player: availableTeamAPlayers[0] });

                    if (score === 'wb') {
                        teamAPlayerScoreCards[availableTeamAPlayers[0]].wb = teamAPlayerScoreCards[availableTeamAPlayers[0]].wb + 1;
                        teamAScoreCard.wb = teamAScoreCard.wb + 1;
                        teamBBowlingData.wb = teamBBowlingData.wb + 1;
                        teamBBowlersScoreCard[currentlyBowlingPlayer].wb = teamBBowlersScoreCard[currentlyBowlingPlayer].wb + 1;
                    } else if (score === 'nb') {
                        teamAPlayerScoreCards[availableTeamAPlayers[0]].nb = teamAPlayerScoreCards[availableTeamAPlayers[0]].nb + 1;
                        teamAScoreCard.nb = teamAScoreCard.nb + 1;
                        teamBBowlingData.nb = teamBBowlingData.nb + 1;
                        teamBBowlersScoreCard[currentlyBowlingPlayer].nb = teamBBowlersScoreCard[currentlyBowlingPlayer].nb + 1;
                    } else if (score === 'out') {
                        availableOverA = availableOverA - 1;
                        teamAPlayerScoreCards[availableTeamAPlayers[0]].balls = teamAPlayerScoreCards[availableTeamAPlayers[0]].balls + 1;
                        teamBBowlersScoreCard[currentlyBowlingPlayer].balls = teamBBowlersScoreCard[currentlyBowlingPlayer].balls + 1;
                        teamBBowlersScoreCard[currentlyBowlingPlayer].wickets = teamBBowlersScoreCard[currentlyBowlingPlayer].wickets + 1;
                        teamAPlayerScoreCards[availableTeamAPlayers[0]].wicketBy = currentlyBowlingPlayer;
                        teamBBowlingData.balls = teamBBowlingData.balls + 1;
                        teamBBowlingData.wickets = teamBBowlingData.wickets + 1;
                        // availableTeamAPlayers.shift(1);
                        // teamAPlayerScoreCards[availableTeamAPlayers[0]] = { score: 0, scoreCards: [], balls: 0 };
                    } else {
                        if (score === 0) {
                            teamAPlayerScoreCards[availableTeamAPlayers[0]].zeros = teamAPlayerScoreCards[availableTeamAPlayers[0]].zeros + 1;
                            teamAScoreCard.zeros = teamAScoreCard.zeros + 1;
                            teamBBowlersScoreCard[currentlyBowlingPlayer].zeros = teamBBowlersScoreCard[currentlyBowlingPlayer].zeros + 1;
                            teamBBowlingData.zeros = teamBBowlingData.zeros + 1;
                        } else if (score === 4) {
                            teamAPlayerScoreCards[availableTeamAPlayers[0]].fours = teamAPlayerScoreCards[availableTeamAPlayers[0]].fours + 1;
                            teamAScoreCard.fours = teamAScoreCard.fours + 1;
                            teamBBowlersScoreCard[currentlyBowlingPlayer].fours = teamBBowlersScoreCard[currentlyBowlingPlayer].fours + 1;
                            teamBBowlingData.fours = teamBBowlingData.fours + 1;
                        } else if (score === 6) {
                            teamAPlayerScoreCards[availableTeamAPlayers[0]].sixes = teamAPlayerScoreCards[availableTeamAPlayers[0]].sixes + 1;
                            teamAScoreCard.sixes = teamAScoreCard.sixes + 1;
                            teamBBowlersScoreCard[currentlyBowlingPlayer].sixes = teamBBowlersScoreCard[currentlyBowlingPlayer].sixes + 1;
                            teamBBowlingData.sixes = teamBBowlingData.sixes + 1;
                        }
                        teamAScore = teamAScore + score;
                        teamBBowlingData.score = teamBBowlingData.score + score;
                        teamBBowlingData.balls = teamBBowlingData.balls + 1;
                        teamAPlayerScoreCards[availableTeamAPlayers[0]].balls = teamAPlayerScoreCards[availableTeamAPlayers[0]].balls + 1;
                        teamBBowlersScoreCard[currentlyBowlingPlayer].balls = teamBBowlersScoreCard[currentlyBowlingPlayer].balls + 1;
                        teamAPlayerScoreCards[availableTeamAPlayers[0]].score = teamAPlayerScoreCards[availableTeamAPlayers[0]].score + score;
                        teamBBowlersScoreCard[currentlyBowlingPlayer].score = teamBBowlersScoreCard[currentlyBowlingPlayer].score + score;
                        availableOverA = availableOverA - 1;
                    }

                    const RR = ((Math.floor(teamAPlayerScoreCards[availableTeamAPlayers[0]].score / ((teamAPlayerScoreCards[availableTeamAPlayers[0]].balls)/6) * 100)) / 100);

                    document.getElementById('playerScoreCard').innerHTML = "<div class='scoreCard'>" + currentlyPlaying + "</div>"
                        + "<div class='scoreCard'>" + availableTeamAPlayers[0] + "</div>"
                        + "<div class='scoreCard'>" + score + "</div>"
                        + "<div class='scoreCard'>" + teamAPlayerScoreCards[availableTeamAPlayers[0]].score + "</div>"
                        + "<div class='scoreCard'>" + teamAScore + ' - ' + (teamA.length - availableTeamAPlayers.length) + "</div>"
                        + "<div class='scoreCard'>" + Math.floor(((overs * 6) - availableOverA) / 6) + ' - ' + ((overs * 6) - availableOverA) % 6 + "</div>"
                        + "<div class='scoreCard'>" + RR + "</div>";

                    if (score === 'out') {
                        availableTeamAPlayers.shift(1);
                        teamAPlayerScoreCards[availableTeamAPlayers[0]] = { score: 0, scoreCards: [], balls: 0, wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0 };
                    }

                    // console.log(teamAPlayerScoreCards);
                } else if (currentlyPlaying === 'teamB' && availableTeamBPlayers.length > 1 && availableOverB > 0) {
                    if (teamBScore > teamAScore) {
                        availableTeamBPlayers = [];
                    }

                    if(availableOverB % 6 === 0 && (previousBall !== 'wb' || previousBall !== 'nb')) {
                        currentlyBowlingPlayer = teamABowlers.shift();
                        teamABowlers.push(currentlyBowlingPlayer);
                    }

                    var score = availableScores[Math.floor(Math.random() * availableScores.length)];
                    previousBall = score;
                    teamBPlayerScoreCards[availableTeamBPlayers[0]].scoreCards.push({ score: score, player: availableTeamBPlayers[0] });

                    if (score === 'wb') {
                        teamBPlayerScoreCards[availableTeamBPlayers[0]].wb = teamBPlayerScoreCards[availableTeamBPlayers[0]].wb + 1;
                        teamBScoreCard.wb = teamBScoreCard.wb + 1;
                        teamABowlersScoreCard[currentlyBowlingPlayer].wb = teamABowlersScoreCard[currentlyBowlingPlayer].wb + 1;
                        teamABowlingData.wb = teamABowlingData.wb + 1;
                    } else if (score === 'nb') {
                        teamBPlayerScoreCards[availableTeamBPlayers[0]].nb = teamBPlayerScoreCards[availableTeamBPlayers[0]].nb + 1;
                        teamBScoreCard.nb = teamBScoreCard.nb + 1;
                        teamABowlersScoreCard[currentlyBowlingPlayer].nb = teamABowlersScoreCard[currentlyBowlingPlayer].nb + 1;
                        teamABowlingData.nb = teamABowlingData.nb + 1;
                    } else if (score === 'out') {
                        availableOverB = availableOverB - 1;
                        teamBPlayerScoreCards[availableTeamBPlayers[0]].balls = teamBPlayerScoreCards[availableTeamBPlayers[0]].balls + 1;
                        teamABowlersScoreCard[currentlyBowlingPlayer].balls = teamABowlersScoreCard[currentlyBowlingPlayer].balls + 1;
                        teamABowlersScoreCard[currentlyBowlingPlayer].wickets = teamABowlersScoreCard[currentlyBowlingPlayer].wickets + 1;
                        teamBPlayerScoreCards[availableTeamBPlayers[0]].wicketBy = currentlyBowlingPlayer;
                        teamABowlingData.wickets = teamABowlingData.wickets + 1;
                        teamABowlingData.balls = teamABowlingData.balls + 1;
                        // availableTeamBPlayers.shift(1);
                        // teamBPlayerScoreCards[availableTeamBPlayers[0]] = { score: 0, scoreCards: [], balls: 0 };
                    } else {
                        if (score === 0) {
                            teamBPlayerScoreCards[availableTeamBPlayers[0]].zeros = teamBPlayerScoreCards[availableTeamBPlayers[0]].zeros + 1;
                            teamBScoreCard.zeros = teamBScoreCard.zeros + 1;
                            teamABowlersScoreCard[currentlyBowlingPlayer].zeros = teamABowlersScoreCard[currentlyBowlingPlayer].zeros + 1;
                            teamABowlingData.zeros = teamABowlingData.zeros + 1;
                        } else if (score === 4) {
                            teamBPlayerScoreCards[availableTeamBPlayers[0]].fours = teamBPlayerScoreCards[availableTeamBPlayers[0]].fours + 1;
                            teamBScoreCard.fours = teamBScoreCard.fours + 1;
                            teamABowlersScoreCard[currentlyBowlingPlayer].fours = teamABowlersScoreCard[currentlyBowlingPlayer].fours + 1;
                            teamABowlingData.fours = teamABowlingData.fours + 1;
                        } else if (score === 6) {
                            teamBPlayerScoreCards[availableTeamBPlayers[0]].sixes = teamBPlayerScoreCards[availableTeamBPlayers[0]].sixes + 1;
                            teamBScoreCard.sixes = teamBScoreCard.sixes + 1;
                            teamABowlersScoreCard[currentlyBowlingPlayer].sixes = teamABowlersScoreCard[currentlyBowlingPlayer].sixes + 1;
                            teamABowlingData.sixes = teamABowlingData.sixes + 1;
                        }
                        teamBScore = teamBScore + score;
                        teamABowlingData.score = teamABowlingData.score + score;
                        teamABowlingData.balls = teamABowlingData.balls + 1;
                        teamBPlayerScoreCards[availableTeamBPlayers[0]].balls = teamBPlayerScoreCards[availableTeamBPlayers[0]].balls + 1;
                        teamABowlersScoreCard[currentlyBowlingPlayer].balls = teamABowlersScoreCard[currentlyBowlingPlayer].balls + 1;
                        teamBPlayerScoreCards[availableTeamBPlayers[0]].score = teamBPlayerScoreCards[availableTeamBPlayers[0]].score + score;
                        teamABowlersScoreCard[currentlyBowlingPlayer].score = teamABowlersScoreCard[currentlyBowlingPlayer].score + score;
                        availableOverB = availableOverB - 1;
                    }

                    const RR = ((Math.floor(teamBPlayerScoreCards[availableTeamBPlayers[0]].score / ((teamBPlayerScoreCards[availableTeamBPlayers[0]].balls)/6) * 100)) / 100);

                    document.getElementById('playerScoreCard').innerHTML = "<div class='scoreCard'>" + currentlyPlaying + "</div>"
                        + "<div class='scoreCard'>" + availableTeamBPlayers[0] + "</div>"
                        + "<div class='scoreCard'>" + score + "</div>"
                        + "<div class='scoreCard'>" + teamBPlayerScoreCards[availableTeamBPlayers[0]].score + "</div>"
                        + "<div class='scoreCard'>" + teamBScore + ' - ' + (teamA.length - availableTeamBPlayers.length) + "</div>"
                        + "<div class='scoreCard'>" + Math.floor(((overs * 6) - availableOverB) / 6) + ' - ' + ((overs * 6) - availableOverB) % 6 + "</div>"
                        + "<div class='scoreCard'>" + RR + "</div>"
                        + "<div class='scoreCard'>" + teamAScore + "</div>"
                        ;

                    if (score === 'out') {
                        availableTeamBPlayers.shift(1);
                        teamBPlayerScoreCards[availableTeamBPlayers[0]] = { score: 0, scoreCards: [], balls: 0, wb: 0, nb: 0, fours: 0, sixes: 0, zeros: 0 };
                    }
                        
                } else if (currentlyPlaying === 'teamA' && (availableTeamAPlayers.length <= 1 || availableOverA < 1)) {
                    currentlyPlaying = 'teamB';
                    document.getElementById('scoreCardHeader').innerHTML = document.getElementById('scoreCardHeader').innerHTML + '<div class="scoreHeader">Target</div>';
                    document.getElementById('playerScoreCard').innerHTML = document.getElementById('playerScoreCard').innerHTML + '<div class="scoreCard"> ' + teamAScore + ' </div>';
                    currentlyBowlingPlayer = teamABowlers.shift();
                    teamABowlers.push(currentlyBowlingPlayer);
                }
                else {
                    document.getElementById('start').className = "started"
                    document.getElementById('teamA').className = "hideTeamA column";
                    document.getElementById('stop').click();
                    if (teamAScore > teamBScore) {
                        document.getElementById('winner').innerText = "Team-A won"
                    } else if (teamAScore < teamBScore) {
                        document.getElementById('winner').innerText = "Team-B won"
                    } else {
                        document.getElementById('winner').innerText = "Tie"
                    }
                    document.getElementById('winner').className = "";
                    display = "";
                    for (const [key, value] of Object.entries(teamAPlayerScoreCards)) {
                        let RR = 0;
                        if (value['score'] != 0 || value['balls'] != 0) {
                            RR = (Math.floor((value['score'] / (value['balls']/6)) * 100)) / 100;
                        }
                        display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamASummaryScoreCard">'
                            + '<div class="scoreCard name">' + key + '</div>'
                            + ' <div class="scoreCard score">' + value['score'] + '</div>'
                            + ' <div class="scoreCard score">' + Math.floor(value['balls'] / 6) + ' - ' + (value['balls'] % 6) + '</div>'
                            + ' <div class="scoreCard score">' + value['wb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['nb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['zeros'] + '</div>'
                            + ' <div class="scoreCard score">' + value['fours'] + '</div>'
                            + ' <div class="scoreCard score">' + value['sixes'] + '</div>'
                            + ' <div class="scoreCard score">' + RR + '</div>'
                            + ' <div class="scoreCard name">' + (value['wicketBy'] === undefined ? '' : value['wicketBy'])  + '</div>'
                            + '</div>'
                    }
                    display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamASummaryScoreCard">'
                        + '<div class="scoreHeader name">Total</div>'
                        + ' <div class="scoreHeader score">' + teamAScore + '</div>'
                        + ' <div class="scoreHeader score">' + Math.floor(((overs * 6) - availableOverA) / 6) + ' - ' + (((overs * 6) - availableOverA) % 6) + '</div>'
                        + ' <div class="scoreHeader score">' + teamAScoreCard['wb'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamAScoreCard['nb'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamAScoreCard['zeros'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamAScoreCard['fours'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamAScoreCard['sixes'] + '</div>'
                        + ' <div class="scoreHeader score" style="background-color: transparent; border: 0px; color: white;"></div>'
                        + ' <div class="scoreHeader name" style="background-color: transparent; border: 0px; color: white;"></div>'
                        + '</div>'
                    document.getElementById('teamASummary').innerHTML = document.getElementById('teamASummary').innerHTML + display

                    display = "";
                    for (const [key, value] of Object.entries(teamABowlersScoreCard)) {
                        display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamASummaryScoreCard">'
                            + '<div class="scoreCard name">' + key + '</div>'
                            + ' <div class="scoreCard score">' + value['score'] + '</div>'
                            + ' <div class="scoreCard score">' + Math.floor(value['balls'] / 6) + ' - ' + (value['balls'] % 6) + '</div>'
                            + ' <div class="scoreCard score">' + value['wb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['nb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['zeros'] + '</div>'
                            + ' <div class="scoreCard score">' + value['fours'] + '</div>'
                            + ' <div class="scoreCard score">' + value['sixes'] + '</div>'
                            + ' <div class="scoreCard score">' + value['wickets'] + '</div>'
                            + '</div>'
                    }
                    display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamASummaryScoreCard">'
                            + '<div class="scoreHeader name">Total</div>'
                            + ' <div class="scoreHeader score">' + teamABowlingData['score'] + '</div>'
                            + ' <div class="scoreHeader score">' + Math.floor(teamABowlingData['balls'] / 6) + ' - ' + (teamABowlingData['balls'] % 6) + '</div>'
                            + ' <div class="scoreHeader score">' + teamABowlingData['wb'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamABowlingData['nb'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamABowlingData['zeros'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamABowlingData['fours'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamABowlingData['sixes'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamABowlingData['wickets'] + '</div>'
                            + '</div>'
                    document.getElementById('teamASummaryBowling').innerHTML = document.getElementById('teamASummaryBowling').innerHTML + display

                    display = "";
                    for (const [key, value] of Object.entries(teamBBowlersScoreCard)) {
                        display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamASummaryScoreCard">'
                            + '<div class="scoreCard name">' + key + '</div>'
                            + ' <div class="scoreCard score">' + value['score'] + '</div>'
                            + ' <div class="scoreCard score">' + Math.floor(value['balls'] / 6) + ' - ' + (value['balls'] % 6) + '</div>'
                            + ' <div class="scoreCard score">' + value['wb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['nb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['zeros'] + '</div>'
                            + ' <div class="scoreCard score">' + value['fours'] + '</div>'
                            + ' <div class="scoreCard score">' + value['sixes'] + '</div>'
                            + ' <div class="scoreCard score">' + value['wickets'] + '</div>'
                            + '</div>'
                    }
                    display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamASummaryScoreCard">'
                            + '<div class="scoreHeader name">Total</div>'
                            + ' <div class="scoreHeader score">' + teamBBowlingData['score'] + '</div>'
                            + ' <div class="scoreHeader score">' + Math.floor(teamBBowlingData['balls'] / 6) + ' - ' + (teamBBowlingData['balls'] % 6) + '</div>'
                            + ' <div class="scoreHeader score">' + teamBBowlingData['wb'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamBBowlingData['nb'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamBBowlingData['zeros'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamBBowlingData['fours'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamBBowlingData['sixes'] + '</div>'
                            + ' <div class="scoreHeader score">' + teamBBowlingData['wickets'] + '</div>'
                            + '</div>'
                    document.getElementById('teamBSummaryBowling').innerHTML = document.getElementById('teamBSummaryBowling').innerHTML + display

                    display = "";
                    for (const [key, value] of Object.entries(teamBPlayerScoreCards)) {
                        let RR = 0;
                        if (value['score'] != 0 || value['balls'] != 0) {
                            RR = (Math.floor((value['score'] / (value['balls']/6)) * 100)) / 100;
                        }
                        display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamBSummaryScoreCard">'
                            + '<div class="scoreCard name">' + key + '</div>'
                            + ' <div class="scoreCard score">' + value['score'] + '</div>'
                            + ' <div class="scoreCard score">' + Math.floor(value['balls'] / 6) + ' - ' + (value['balls'] % 6) + '</div>'
                            + ' <div class="scoreCard score">' + value['wb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['nb'] + '</div>'
                            + ' <div class="scoreCard score">' + value['zeros'] + '</div>'
                            + ' <div class="scoreCard score">' + value['fours'] + '</div>'
                            + ' <div class="scoreCard score">' + value['sixes'] + '</div>'
                            + ' <div class="scoreCard score">' + RR + '</div>'
                            + ' <div class="scoreCard name">' + (value['wicketBy'] === undefined ? '' : value['wicketBy']) + '</div>'
                            + '</div>'
                    }
                    display = display + '<div class="flex row center" style="margin-top: 3px;" id="teamBSummaryScoreCard">'
                        + '<div class="scoreHeader name">Total</div>'
                        + ' <div class="scoreHeader score">' + teamBScore + '</div>'
                        + ' <div class="scoreHeader score">' + Math.floor(((overs * 6) - availableOverB) / 6) + ' - ' + (((overs * 6) - availableOverB) % 6) + '</div>'
                        + ' <div class="scoreHeader score">' + teamBScoreCard['wb'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamBScoreCard['nb'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamBScoreCard['zeros'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamBScoreCard['fours'] + '</div>'
                        + ' <div class="scoreHeader score">' + teamBScoreCard['sixes'] + '</div>'
                        + ' <div class="scoreHeader score" style="background-color: transparent; border: 0px; color: white;"></div>'
                        + ' <div class="scoreHeader name" style="background-color: transparent; border: 0px; color: white;"></div>'
                        + '</div>'
                    document.getElementById('teamBSummary').innerHTML = document.getElementById('teamBSummary').innerHTML + display
                    document.getElementById('matchSummary').className = "flex column center"
                }
            }, 1000);
        }
    }

    // if (e.className && e.className.indexOf('stop') != -1) {
    //     document.getElementById('start').className = "start"
    //     document.getElementById('stop').className = "stoped"
    // }
}