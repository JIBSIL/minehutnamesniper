// Imports

// const randomWords = require('random-english-words');
const axios = require('axios')
const fs = require('fs')
let chalk = {

};

async function esimports() {
    return new Promise(async (resolve, reject) => {
        await import('./node_modules/chalk/source/index.js').then(({
            blue
        }) => {
            chalk.blue = blue
            console.log(chalk.blue)
            resolve()
        })
    })
};

const options = {
    minCount: 10000,
    debug: false,
    logErrors: true,
}

// Generate words

const wordarr = [ //credit VOA special words
    'a', 'an', 'able', 'about', 'above', 'abuse', 'accept', 'accident', 'accuse', 'across',
    'act', 'activist', 'actor', 'add', 'administration', 'admit', 'adult', 'advertise', 'advise', 'affect',
    'afraid', 'after', 'again', 'against', 'age', 'agency', 'aggression', 'ago', 'agree', 'agriculture',
    'aid', 'aim', 'air', 'airplane', 'airport', 'album', 'alcohol', 'alive', 'all',
    'ally', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'ambassador', 'amend',
    'ammunition', 'among', 'amount', 'anarchy', 'ancestor', 'ancient', 'and', 'anger', 'animal', 'anniversary',
    'announce', 'another', 'answer', 'any', 'apologize', 'appeal', 'appear', 'appoint', 'approve', 'archeology',
    'area', 'argue', 'arms', 'army', 'around', 'arrest', 'arrive', 'art', 'artillery', 'as',
    'ash', 'ask', 'assist', 'astronaut', 'astronomy', 'asylum', 'at', 'atmosphere', 'attach', 'attack',
    'attempt', 'attend', 'attention', 'automobile', 'autumn', 'available', 'average', 'avoid', 'awake', 'award',
    'away', 'baby', 'back', 'bad', 'balance', 'ball', 'balloon', 'ballot', 'ban', 'bank',
    'bar', 'barrier', 'base', 'battle', 'be', 'beat', 'beauty', 'because', 'become', 'bed',
    'before', 'begin', 'behavior', 'behind', 'believe', 'belong', 'below', 'best', 'betray', 'better',
    'between', 'big', 'bill', 'biology', 'bird', 'bite', 'black', 'blame', 'bleed', 'blind',
    'block', 'blood', 'blow', 'blue', 'boat', 'body', 'boil', 'bomb', 'bone', 'book',
    'border', 'born', 'borrow', 'both', 'bottle', 'bottom', 'box', 'boy', 'boycott', 'brain',
    'brave', 'bread', 'break', 'breathe', 'bridge', 'brief', 'bright', 'bring', 'broadcast', 'brother',
    'brown', 'budget', 'build', 'building', 'bullet', 'burn', 'burst', 'bury', 'bus', 'business',
    'busy', 'but', 'buy', 'by', 'cabinet', 'call', 'calm', 'camera', 'camp', 'campaign',
    'can', 'cancel', 'cancer', 'candidate', 'capital', 'capture', 'car', 'care', 'career', 'careful',
    'carry', 'case', 'cat', 'catch', 'cause', 'ceasefire', 'celebrate', 'center', 'century', 'ceremony',
    'chairman', 'champion', 'chance', 'change', 'charge', 'chase', 'cheat', 'cheer', 'chemicals', 'chemistry',
    'chief', 'child', 'children', 'choose', 'circle', 'citizen', 'city', 'civilian', 'claim',
    'clash', 'class', 'clean', 'clear', 'clergy', 'climate', 'climb', 'clock', 'close', 'cloth',
    'clothes', 'cloud', 'coal', 'coalition', 'coast', 'coffee', 'cold', 'collapse', 'collect', 'college',
    'colony', 'color', 'combine', 'come', 'command', 'comment', 'committee', 'common', 'communicate', 'community',
    'company', 'compare', 'compete', 'complete', 'complex', 'compromise', 'computer', 'concern', 'condemn', 'condition',
    'conference', 'confirm', 'conflict', 'congratulate', 'Congress', 'connect', 'conservative', 'consider', 'constitution', 'contact',
    'contain', 'container', 'continent', 'continue', 'control', 'convention', 'cook', 'cool', 'cooperate', 'copy',
    'corn', 'correct', 'corruption', 'cost', 'cotton', 'count', 'country', 'court', 'cover', 'cow',
    'crash', 'create', 'creature', 'credit', 'crew', 'crime', 'criminal', 'crisis', 'criticize', 'crops',
    'cross', 'crowd', 'crush', 'cry', 'culture', 'cure', 'curfew', 'current', 'custom', 'customs',
    'cut', 'dam', 'damage', 'dance', 'danger', 'dark', 'date', 'daughter', 'day', 'dead',
    'deaf', 'deal', 'debate', 'debt', 'decide', 'declare', 'decrease', 'deep', 'defeat', 'defend',
    'deficit', 'define', 'degree', 'delay', 'delegate', 'demand', 'democracy', 'demonstrate', 'denounce', 'deny',
    'depend', 'deplore', 'deploy', 'depression', 'describe', 'desert', 'design', 'desire', 'destroy', 'detail',
    'detain', 'develop', 'device', 'dictator', 'die', 'diet', 'different', 'difficult', 'dig', 'dinner',
    'diplomat', 'direct', 'direction', 'dirt', 'disappear', 'disarm', 'disaster', 'discover', 'discrimination', 'discuss',
    'disease', 'dismiss', 'dispute', 'dissident', 'distance', 'dive', 'divide', 'do', 'doctor', 'document',
    'dog', 'dollar', 'donate', 'door', 'double', 'down', 'dream', 'drink', 'drive', 'drop',
    'drown', 'drug', 'dry', 'during', 'dust', 'duty', 'each', 'early', 'earn', 'earth',
    'earthquake', 'ease', 'east', 'easy', 'eat', 'ecology', 'economy', 'edge', 'education', 'effect',
    'effort', 'egg', 'either', 'elect', 'electricity', 'embassy', 'embryo', 'emergency', 'emotion', 'employ',
    'empty', 'end', 'enemy', 'energy', 'enforce', 'engine', 'engineer', 'enjoy', 'enough', 'enter',
    'environment', 'equal', 'equipment', 'escape', 'especially', 'establish', 'estimate', 'ethnic', 'evaporate', 'even',
    'event', 'ever', 'every', 'evidence', 'evil', 'exact', 'examine', 'example', 'excellent', 'except',
    'exchange', 'excuse', 'execute', 'exercise', 'exile', 'exist', 'expand', 'expect', 'expel', 'experience',
    'experiment', 'expert', 'explain', 'explode', 'explore', 'export', 'express', 'extend', 'extra', 'extraordinary',
    'extreme', 'extremist', 'face', 'fact', 'factory', 'fail', 'fair', 'fall', 'false', 'family',
    'famous', 'fan', 'far', 'farm', 'fast', 'fat', 'father', 'favorite', 'fear', 'federal',
    'feed', 'feel', 'female', 'fence', 'fertile', 'few', 'field', 'fierce', 'fight', 'fill',
    'film', 'final', 'financial', 'find', 'fine', 'finish', 'fire', 'fireworks', 'firm', 'first',
    'fish', 'fit', 'fix', 'flag', 'flat', 'flee', 'float', 'flood', 'floor', 'flow',
    'flower', 'fluid', 'fly', 'fog', 'follow', 'food', 'fool', 'foot', 'for', 'force',
    'foreign', 'forest', 'forget', 'forgive', 'form', 'former', 'forward', 'free', 'freedom', 'freeze',
    'fresh', 'friend', 'frighten', 'from', 'front', 'fruit', 'fuel', 'full', 'fun', 'funeral',
    'future', 'gain', 'game', 'gas', 'gather', 'general', 'generation', 'genocide', 'gentle', 'get',
    'gift', 'girl', 'give', 'glass', 'go', 'goal', 'god', 'gold', 'good', 'goods',
    'govern', 'government', 'grain', 'grass', 'gray', 'great', 'green', 'grind', 'ground', 'group',
    'grow', 'guarantee', 'guard', 'guerrilla', 'guide', 'guilty', 'gun', 'hair', 'half', 'halt',
    'hang', 'happen', 'happy', 'hard', 'harm', 'harvest', 'hat', 'hate', 'have', 'he',
    'head', 'headquarters', 'heal', 'health', 'hear', 'heat', 'heavy', 'helicopter', 'help', 'here',
    'hero', 'hide', 'high', 'hijack', 'hill', 'history', 'hit', 'hold', 'hole', 'holiday',
    'holy', 'home', 'honest', 'honor', 'hope', 'horrible', 'horse', 'hospital', 'hostage', 'hostile',
    'hot', 'hotel', 'hour', 'house', 'how', 'however', 'huge', 'human', 'humor', 'hunger',
    'hunt', 'hurry', 'hurt', 'husband', 'I', 'ice', 'idea', 'identify', 'if', 'ignore',
    'illegal', 'imagine', 'immediate', 'immigrant', 'import', 'important', 'improve', 'in', 'incident', 'incite',
    'include', 'increase', 'independent', 'individual', 'industry', 'infect', 'inflation', 'influence', 'inform', 'information',
    'inject', 'injure', 'innocent', 'insane', 'insect', 'inspect', 'instead', 'instrument', 'insult', 'intelligence',
    'intelligent', 'intense', 'interest', 'interfere', 'international', 'Internet', 'intervene', 'invade', 'invent', 'invest',
    'investigate', 'invite', 'involve', 'iron', 'island', 'issue', 'it', 'jail', 'jewel', 'job',
    'join', 'joint', 'joke', 'judge', 'jump', 'jury', 'just', 'justice', 'keep', 'kick',
    'kidnap', 'kill', 'kind', 'kiss', 'knife', 'know', 'knowledge', 'labor', 'laboratory', 'lack',
    'lake', 'land', 'language', 'large', 'last', 'late', 'laugh', 'launch', 'law', 'lead',
    'leak', 'learn', 'leave', 'left', 'legal', 'legislature', 'lend', 'less', 'let', 'letter',
    'level', 'liberal', 'lie', 'life', 'lift', 'light', 'lightning', 'like', 'limit', 'line',
    'link', 'liquid', 'list', 'listen', 'literature', 'little', 'live', 'load', 'loan', 'local',
    'lonely', 'long', 'look', 'lose', 'loud', 'love', 'low', 'loyal', 'luck', 'machine',
    'magazine', 'mail', 'main', 'major', 'majority', 'make', 'male', 'man', 'manufacture', 'many',
    'map', 'march', 'mark', 'market', 'marry', 'mass', 'mate', 'material', 'mathematics', 'matter',
    'may', 'mayor', 'meal', 'mean', 'measure', 'meat', 'media', 'medicine', 'meet', 'melt',
    'member', 'memorial', 'memory', 'mental', 'message', 'metal', 'method', 'microscope', 'middle', 'militant',
    'military', 'militia', 'milk', 'mind', 'mine', 'mineral', 'minister', 'minor', 'minority', 'minute',
    'miss', 'missile', 'missing', 'mistake', 'mix', 'mob', 'model', 'moderate', 'modern', 'money',
    'month', 'moon', 'moral', 'more', 'morning', 'most', 'mother', 'motion', 'mountain', 'mourn',
    'move', 'movement', 'movie', 'much', 'murder', 'music', 'must', 'mystery', 'name', 'narrow',
    'nation', 'native', 'natural', 'nature', 'navy', 'near', 'necessary', 'need', 'negotiate', 'neighbor',
    'neither', 'neutral', 'never', 'new', 'news', 'next', 'nice', 'night', 'no', 'noise',
    'nominate', 'noon', 'normal', 'north', 'not', 'note', 'nothing', 'now', 'nowhere', 'nuclear',
    'number', 'obey', 'object', 'observe', 'occupy', 'ocean', 'of', 'off', 'offensive', 'offer',
    'office', 'officer', 'official', 'often', 'oil', 'old', 'on', 'once', 'only', 'open',
    'operate', 'opinion', 'oppose', 'opposite', 'oppress', 'or', 'orbit', 'order', 'organize', 'other',
    'our', 'oust', 'out', 'over', 'overthrow', 'owe', 'own', 'pain', 'paint', 'paper',
    'parachute', 'parade', 'pardon', 'parent', 'parliament', 'part', 'partner', 'party', 'pass', 'passenger',
    'passport', 'past', 'path', 'patient', 'pay', 'peace', 'people', 'percent', 'perfect', 'perform',
    'period', 'permanent', 'permit', 'person', 'persuade', 'physical', 'physics', 'picture', 'piece', 'pig',
    'pilot', 'pipe', 'place', 'plan', 'planet', 'plant', 'plastic', 'play', 'please', 'plenty',
    'plot', 'poem', 'point', 'poison', 'police', 'policy', 'politics', 'pollute', 'poor', 'popular',
    'population', 'port', 'position', 'possess', 'possible', 'postpone', 'pour', 'poverty', 'power', 'praise',
    'pray', 'predict', 'pregnant', 'present', 'president', 'press', 'pressure', 'prevent', 'price', 'prison',
    'private', 'prize', 'probably', 'problem', 'process', 'produce', 'profession', 'professor', 'profit', 'program',
    'progress', 'project', 'promise', 'propaganda', 'property', 'propose', 'protect', 'protest', 'prove', 'provide',
    'public', 'publication', 'publish', 'pull', 'pump', 'punish', 'purchase', 'pure', 'purpose', 'push',
    'put', 'quality', 'question', 'quick', 'quiet', 'race', 'radar', 'radiation', 'radio', 'raid',
    'railroad', 'rain', 'raise', 'rape', 'rare', 'rate', 'reach', 'react', 'read', 'ready',
    'real', 'realistic', 'reason', 'reasonable', 'rebel', 'receive', 'recent', 'recession', 'recognize', 'record',
    'recover', 'red', 'reduce', 'reform', 'refugee', 'refuse', 'register', 'regret', 'reject', 'relations',
    'release', 'religion', 'remain', 'remains', 'remember', 'remove', 'repair', 'repeat', 'report', 'represent',
    'repress', 'request', 'require', 'rescue', 'research', 'resign', 'resist', 'resolution', 'resource', 'respect',
    'responsible', 'rest', 'restaurant', 'restrain', 'restrict', 'result', 'retire', 'return', 'revolt', 'rice',
    'rich', 'ride', 'right', 'riot', 'rise', 'risk', 'river', 'road', 'rob', 'rock',
    'rocket', 'roll', 'room', 'root', 'rope', 'rough', 'round', 'rub', 'rubber', 'ruin',
    'rule', 'run', 'rural', 'sabotage', 'sacrifice', 'sad', 'safe', 'sail', 'sailor', 'salt',
    'same', 'sand', 'satellite', 'satisfy', 'save', 'say', 'school', 'science', 'sea', 'search',
    'season', 'seat', 'second', 'secret', 'security', 'see', 'seed', 'seeking', 'seem', 'seize',
    'self', 'sell', 'Senate', 'send', 'sense', 'sentence', 'separate', 'series', 'serious', 'serve',
    'service', 'set', 'settle', 'several', 'severe', 'sex', 'shake', 'shape', 'share', 'sharp',
    'she', 'sheep', 'shell', 'shelter', 'shine', 'ship', 'shock', 'shoe', 'shoot', 'short',
    'should', 'shout', 'show', 'shrink', 'sick', 'sickness', 'side', 'sign', 'signal', 'silence',
    'silver', 'similar', 'simple', 'since', 'sing', 'single', 'sink', 'sister', 'sit', 'situation',
    'size', 'skeleton', 'skill', 'skin', 'sky', 'slave', 'sleep', 'slide', 'slow', 'small',
    'smash', 'smell', 'smoke', 'smooth', 'snow', 'so', 'social', 'soft', 'soil', 'soldier',
    'solid', 'solve', 'some', 'son', 'soon', 'sort', 'sound', 'south', 'space', 'speak',
    'special', 'speech', 'speed', 'spend', 'spill', 'spirit', 'split', 'sport', 'spread', 'spring',
    'spy', 'square', 'stab', 'stand', 'star', 'start', 'starve', 'state', 'station', 'statue',
    'stay', 'steal', 'steam', 'steel', 'step', 'stick', 'still', 'stone', 'stop', 'store',
    'storm', 'story', 'stove', 'straight', 'strange', 'street', 'stretch', 'strike', 'strong', 'structure',
    'struggle', 'study', 'stupid', 'subject', 'submarine', 'substance', 'substitute', 'subversion', 'succeed', 'such',
    'sudden', 'suffer', 'sugar', 'suggest', 'suicide', 'summer', 'sun', 'supervise', 'supply', 'support',
    'suppose', 'suppress', 'sure', 'surface', 'surplus', 'surprise', 'surrender', 'surround', 'survive', 'suspect',
    'suspend', 'swallow', 'sweet', 'swim', 'sympathy', 'system', 'take', 'talk', 'tall',
    'tank', 'target', 'taste', 'tax', 'tea', 'teach', 'team', 'tear', 'technical', 'technology',
    'telephone', 'telescope', 'television', 'tell', 'temperature', 'temporary', 'tense', 'term', 'terrible', 'territory',
    'terror', 'terrorist', 'test', 'than', 'thank', 'that', 'the', 'theater', 'them', 'then',
    'theory', 'there', 'these', 'they', 'thick', 'thin', 'thing', 'think', 'third', 'this',
    'threaten', 'through', 'throw', 'tie', 'time', 'tired', 'to', 'today', 'together', 'tomorrow',
    'tonight', 'too', 'tool', 'top', 'torture', 'total', 'touch', 'toward', 'town', 'trade',
    'tradition', 'traffic', 'tragic', 'train', 'transport', 'transportation', 'trap', 'travel', 'treason', 'treasure',
    'treat', 'treatment', 'treaty', 'tree', 'trial', 'tribe', 'trick', 'trip', 'troops', 'trouble',
    'truce', 'truck', 'true', 'trust', 'try', 'tube', 'turn', 'under', 'understand', 'unite',
    'universe', 'university', 'unless', 'until', 'up', 'urge', 'urgent', 'us', 'use', 'usual',
    'vacation', 'vaccine', 'valley', 'value', 'vegetable', 'vehicle', 'version', 'very', 'veto', 'victim',
    'victory', 'video', 'village', 'violate', 'violence', 'visa', 'visit', 'voice', 'volcano', 'volunteer',
    'vote', 'wages', 'wait', 'walk', 'wall', 'want', 'war', 'warm', 'warn', 'wash',
    'waste', 'watch', 'water', 'wave', 'way', 'we', 'weak', 'wealth', 'weapon', 'wear',
    'weather', 'week', 'weigh', 'welcome', 'well', 'west', 'wet', 'what', 'wheat',
    'wheel', 'when', 'where', 'whether', 'which', 'while', 'white', 'who', 'whole', 'why',
    'wide', 'wife', 'wild', 'will', 'willing', 'win', 'wind', 'window', 'winter', 'wire',
    'wise', 'wish', 'with', 'withdraw', 'without', 'witness', 'woman', 'wonder', 'wonderful', 'wood',
    'word', 'work', 'world', 'worry', 'worse', 'worth', 'wound', 'wreck', 'wreckage', 'write',
    'wrong', 'year', 'yellow', 'yes', 'yesterday', 'yet', 'you', 'young', 'zero', 'zoo'
];

async function main() {
    await esimports()
    // const words = randomWords({ minChars: 4, maxChars: 12, /*minCount: options.minCount*/ })

    // const wordarr = words.split(' ')
    // console.log(wordarr)

    // Debug log function

    const debug = {
        log: (message) => {
            if (options.debug === true) {
                console.log(chalk.gray(`[DEBUG] ${message}`))
            }
        }
    }

    const error = {
        log: (message) => {
            if (options.logErrors === true) {
                console.log(chalk.red(`[ERROR] ${message}`))
            }
        }
    }

    // Fetch Online servers

    const fetchOnlineServers = () => {
        return new Promise((resolve) => {
            axios.get('https://api.minehut.com/servers').then(async (response) => {
                const res = response.data
                console.log(`Total Players: ${res.total_players}, Total servers: ${res.total_servers}`)
                let totalservers = -1
                let serverarr = []
                const servers = res.servers
                const createMap = servers.map((object) => {
                    totalservers = totalservers + 1
                    serverarr.push((object.name).toLowerCase())
                })
                await Promise.all(createMap)
                console.log(`${totalservers + 1} servers are online according to data fetched just now.`)
                resolve(serverarr)
            }).catch((err) => {
                error.log('ERROR WHILE FETCHING SERVERS! ', err)
            })
        })
    }

    // Parse data

    let available = []

    const parseWordResults = async () => {
        console.log(chalk.blue('[INIT] Initializing web client and fetching resources.'))
        console.log(chalk.blue(`[INIT] Fetching ${options.minCount} words from the Voice of America list...`))
        const serverarr = await fetchOnlineServers()
        await Promise.all(wordarr.map(async (word) => {
            word = `${word}Net`
            if (word.length > 3 && word.length < 13 && !available.includes(word)) {
                if (serverarr.includes(word.toLowerCase()) === false) {
                    axios.get(`https://api.minehut.com/server/${word.toLowerCase()}?byName=true`).then(async (response) => {
                        const res = response.data
                        let minehutResponse = res.ok ?? true
                        minehutResponse === false ? debug.log(`An internal (Minehut) error occured while fetching ${word}`) : debug.log(`${word} is not available!`)
                    }).catch((error) => {
                        if (error.response) {
                            const res = error.response.data
                            let minehutResponse = res.ok ?? true
                            let result = minehutResponse === false ? true : false
                            if (result === true && word.length > 3 && word.length < 13 && !available.includes(word)) {
                                available.push(word)
                                console.log(chalk.green(`[STATUS] ${word} is available!`))
                                fs.writeFileSync("words.txt", `${word}\n`, {
                                    flag: 'a+'
                                });
                            }
                        }
                    })
                }
            }
        }))
    }

    parseWordResults()
}; main()