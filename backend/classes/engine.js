/// Class Engine
/// Class responsible to receive the messages, check the targets
/// and return an array of rewards
class Engine {
    targets = [];
    rewards = [];    
    variables = [];

    constructor ({targets, rewards, variables}) {
        this.targets = targets;
        this.rewards = rewards;
        this.variables = variables;
    }

    /// Check if the variables are valid
    checkVariables(messages) {
        let result = [];
        result = messages.filter(message => {
            return this.variables.some(variable => {
                return message.variable === variable.name;
            });
        });
        return result;
    }

    /// Check all the targets there are valid based on the messages received
    checkTarget (messages) {
        let result = [];
        result = this.targets.filter(target => {
            return messages.some(message => {
                return target.variable.name === message.variable && eval(`"${message.value.toString()}" ${target.operation.symbol} "${target.value.toString()}"`);
                // return target.variable.name === message.variable && eval(message.value.toString() + target.operation.symbol + target.value.toString());
            });
        });
        return result;        
    }    

    /// Check all the rewards available based on the messages received
    checkRewards(messages) {
        let checkVariables = this.checkVariables(messages);
        let targets = this.checkTarget(checkVariables);
        let result = [];
        result = this.rewards.filter(reward => {
            return targets.some(target => {
                return eval(reward._id.toString() === target.reward._id.toString());
            });
        });
        return result;
    }
}

module.exports = Engine;