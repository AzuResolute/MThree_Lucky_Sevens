class LuckySevens {
    constructor(startingCash) {
        this.startingCash = this.peakCash = this.cash = startingCash;
        this.currentRoll = this.peakRollPosition = 0;
    };

    game = () => {
        while(this.cash > 0) {
            this.bet();
            this.updateRecord();
        }
    }

    bet = () => {
        const firstRoll = this.rollDice();
        const secondRoll = this.rollDice();
        this.cash += (firstRoll + secondRoll) === 7 ? 4 : -1;
    }

    rollDice = () => Math.floor(Math.random() * 6) + 1;

    updateRecord = () => {
        this.currentRoll++;
        if(this.cash > this.peakCash) {
            this.peakCash = this.cash;
            this.peakRollPosition = this.currentRoll;
        }
    }

    renderResults = () => {
        const results = document.getElementById("results");
        results.innerHTML = 
        `<h1>Results</h1>
        <table class="blueTable">
            <tbody>
                <tr>
                    <td>Starting Bet</td>
                    <td>$${this.startingCash.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Rolls Before Going Broke</td>
                    <td>${this.currentRoll}</td>
                </tr>
                <tr>
                    <td>Highest Amount Won</td>
                    <td>$${this.peakCash.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Roll Count at Highest Amount Won</td>
                    <td>${this.peakRollPosition}</td>
                </tr>
            </tbody>
        </table>`
    }
}

const play = (e) => {
    e.preventDefault();
    const startingCash = Number(document.getElementById('startingCash').value);
    if(startingCash > 0) {
        const luckySevens = new LuckySevens(startingCash);
        luckySevens.game();
        luckySevens.renderResults();
    } else {
        alert("Invalid Starting Amount");
    }
}

try {
    document.getElementById("play").addEventListener('click', play)
} catch (error) {
    console.error(error)
}