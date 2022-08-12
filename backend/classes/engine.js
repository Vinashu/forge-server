///
/// Classes 
///

/// Class Message
/// It has a pair { variable, value } that is send to the server
/// and used to verify for possible targets and rewards
class Message {
    variable = "";
    value = 0;

    constructor (variable, value) {
        this.variable = variable;
        this.value = value;
    }
}

/// Class Dispatcher
/// It is an array of messages, as it is not possible to send an array, 
/// only JSON objects, so the Dispatcher class has just an array of messages
class Dispatcher {
    messages = [];

    constructor(messages) {
        this.messages = messages;
    }
}

/// Class Target
/// Has the rules to check what reward can be optained, by checkig
/// the variable and value that comes in messages
class Target {
    name = "";
    variable = "";
    value = 0;
    operation = "";
    reward = 0;

    constructor(name, variable, value, operation, reward) {
        this.name = name;
        this.variable = variable;
        this.value = value;
        this.operation = operation;
        this.reward = reward;
    }
}

/// Class Reward
/// Collection of possible rewards
class Reward {
    _id = 0;
    category = "";
    name = "";
    description = "";
    imagePath = "";

    constructor(_id, category, name, imagePath, desc) {
        this._id = _id;
        this.category = category;
        this.name = name;
        this.imagePath = imagePath;
        this.description = desc;
    }
}

class Variable {
    name = "";

    constructor (name) {
        this.name = name;
    }
}

/// Class Engine
/// Class responsible to receive the messages, check the targets
/// and return an array of rewards
class Engine {
    targets = [];
    rewards = [];    
    variables = [];

    constructor (targets, rewards, variables) {
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
                return target.variable === message.variable && eval(message.value + target.operation + target.value);
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
                return eval(reward._id === target.reward);
            });
        });
        return result;
    }
}

///
/// Objects
///

/// Variables
const variables = [
    new Variable("activityID"),
    new Variable("levels"),
    new Variable("points"),
    new Variable("allTimePoints"),
]

/// Rewards
const rewards = [
    new Reward(
        1, 
        "Educational Content",
        "What are genomes?", 
        "", 
        "<p><span><span>A genome is the entire genetic information of an organism. A complete copy of the genome is found in each cell of an organism. In GeSort, each puzzle is formed by two genomes, and each of them are represented by a row of coloured shapes.</span></span></p><p><span><img src=\"http://localhost:4000/images/GeSortGenome.png\" width=\"100%\">How genomes are represented in GeSort</span></p>"
    ),
    new Reward( 
        2, 
        "Educational Content",
        "Where are genomes stored?", 
        "", 
        "<p><span><span>In eukaryotes (like animals and plants), the genome is stored inside the nucleus of their cells, whereas in prokaryotes (like bacteria) the genome is located directly in the cytoplasm, which is the substance that makes up much of a cell.</span></span></p><p><span><img src=\"http://localhost:4000/images/Cell.png\" width=\"248px\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src=\"http://localhost:4000/images/Cell%20Prokaryote.png\" width=\"261px\"></span></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eukaryote Cell<sup>1</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prokaryote Cell<sup>2</sup></span></p><p></p><p><span><span><br><br></span></span></p><hr><p><span><span><sup>1</sup>Original title: Structure of a typical animal cell.<br>Link: </span></span><a href=\"https://en.wikipedia.org/wiki/Eukaryote#/media/File:Animal_cell_structure_en.svg\" target=\"_blank\" class=\"keychainify-checked\"><span><span>https://en.wikipedia.org/wiki/Eukaryote#/media/File:Animal_cell_structure_en.svg</span></span></a><br>Copyright: Public Domain</p><p><span><span><sup>2</sup>Original title: Average prokaryote cell numbered.<br>Link: </span></span><a href=\"https://commons.wikimedia.org/wiki/File:Average_prokaryote_cell_numbered.svg#/media/File:%20Average_prokaryote_cell-_unlabled.svg\" class=\"keychainify-checked\"><span><span>https://commons.wikimedia.org/wiki/File:Average_prokaryote_cell_numbered.svg#/media/File: </span></span></a><a href=\"Average_prokaryote_cell-_unlabled.svg\" target=\"_blank\" class=\"keychainify-checked\"><span><span>Average_prokaryote_cell-_unlabled.svg</span></span></a><br>Copyright: Public Domain</p><p></p>"
    ),
    new Reward(
        3, 
        "Educational Content", 
        "What are Chromosomes?",
        "", 
        "<p><span><span>Genomes are further divided into chromosomes. The human genome for example has 23 pairs of chromosomes. Each one of them is formed by a molecule of DNA (which stands for deoxyribonucleic acid). The DNA is a double-stranded molecule formed by two chains of nucleotides connected together. In its natural state, it adopts a double helix structure.</span></span></p><p><span><center><img src=\"http://localhost:4000/images/Chromosome%20Clear.png\" width=\"25%\"></center></span></p><p><span><center>Sample of one Chromosome<sup>1</sup></center></span></p><hr><p><span><span><sup>1</sup>Original title: Diagram of a replicated and condensed metaphase eukaryotic chromosome.<br>Link: </span></span><a href=\"https://en.wikipedia.org/wiki/Chromosome#/media/File:Chromosome.svg\" class=\"keychainify-checked\"><span><span>https://en.wikipedia.org/wiki/Chromosome#/media/File: </span></span></a><a href=\"Chromosome.svg\" target=\"_blank\" class=\"keychainify-checked\"><span><span>Chromosome.svg</span></span></a><br>Copyright: <a href=\"https://creativecommons.org/licenses/by-sa/3.0/\" class=\"keychainify-checked\"><span><span>CC BY-SA </span></span></a><a href=\"3.0\" target=\"_blank\" class=\"keychainify-checked\"><span><span>3.0</span></span></a></p><p></p>"
    ),
    new Reward(
        4, 
        "Educational Content", 
        "What is a DNA?",
        "", 
        "<iframe width=\"905\" height=\"480\" src=\"https://www.youtube.com/embed/2EQI0PkGwbI\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    ),    
    new Reward(
        5, 
        "Educational Content", 
        "Atividade nova",
        "", 
        "<iframe width=\"905\" height=\"480\" src=\"https://www.youtube.com/embed/2EQI0PkGwbI\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    ),        
];

/// Targets
const targets = [
    new Target(
        "Target 1",
        "activityID",
        0,
        "==",
        1
    ),
    new Target(
        "Target 2",
        "activityID",
        1,
        "==",
        2
    ),    
    new Target(
        "Target 3",
        "activityID",
        2,
        "==",
        3
    ),
    new Target(
        "Target 4",
        "activityID",
        3,
        "==",
        4
    ),
    new Target(
        "Target 5",
        "activityID",
        4,
        "==",
        5
    )     
];

/// Messages
/*
const messages = [
    new Message(
        "level",
        1
    ),
    new Message(
        "levels",
        10
    ),
    new Message(
        "points",
        150
    )
]
*/

/// Dispatcher
// const dispatcher = new Dispatcher(messages);
// console.log(engine.checkRewards(dispatcher.messages));

/// Engine, for testing purpose
const engine = new Engine(targets, rewards, variables);


module.exports = {engine, Message};

const {engine, Message} = require('./data.js')

app.use("images", express.static(imagePath));

app.get('/api/rewards/:id', (req, res) => {
    res.json(engine.rewards.filter(reward => reward._id === parseInt(req.params.id)));
})

app.get('/api/rewards', (req, res) => {
    res.json(engine.rewards);
})

app.post('/api/rewards', (req, res) => {
    // console.log(req.method + "=>" + req.originalUrl);            
    // const messages = req.body.messages;
    const messages = req.body;
    if(messages) {
        res.json(engine.checkRewards(messages));
        // res.json({'rewards': engine.checkRewards(messages)});
    } else {
        res.status(500).send('Missing messages body!')
    }
});


