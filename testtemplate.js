/**
 * Credit: https://gist.github.com/bryanerayner/68e1498d4b1b09a30ef6#file-generatetemplatestring-js
 * Bryan Rayner via StackOverflow
 * Produces a function which uses template strings to do simple interpolation from objects.
 * 
 * Usage:
 *    var makeMeKing = generateTemplateString('${name} is now the king of ${country}!');
 * 
 *    console.log(makeMeKing({ name: 'Bryan', country: 'Scotland'}));
 *    // Logs 'Bryan is now the king of Scotland!'
 */
 var generateTemplateString = (function(){
    var cache = {};

    function generateTemplate(template){
        var fn = cache[template];

        if (!fn){
            // Replace ${expressions} (etc) with ${map.expressions}.

            var sanitized = template
                .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match){
                    return `\$\{map.${match.trim()}\}`;
                    })
                // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');

            fn = Function('map', `return \`${sanitized}\``);
        }

        return fn;
    }

    return generateTemplate;
})();

const word = 'a'
const templatestr = '${word}Box'

const templateString = generateTemplateString(templatestr)

console.log(templateString({
    word
}))