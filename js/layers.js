addLayer("p", {
    name: "urge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#dcad13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "urge", // Name of prestige currency
    baseResource: "brainrot", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 12)) mult = mult.times(upgradeEffect('p', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Create urge", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Leave things unchecked",
            description: "Double the amount of brainrot you gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Glorify minor discomforts",
            description: "Urge is multiplied based on brainrot.",
            cost: new Decimal(3),
                effect() {
                    return player[this.layer].points.add(1).pow(0.35)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Neuron activation",
            description: "Brainrot is multiplied based on urge.",
            cost: new Decimal(5),
                effect() {
                    return player[this.layer].points.add(1).pow(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Feedback loop",
            description: "Brainrot is multiplied based on brainrot.",
            cost: new Decimal(15),
                effect() {
                    return player.points.add(10).log(10)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    }
})
