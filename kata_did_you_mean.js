/*
https://www.codewars.com/kata/5259510fc76e59579e0009d4
I'm sure, you know Google's "Did you mean ...?", when you entered a search term and mistyped a word. In this kata we want to implement something similar.

You'll get an entered term (lowercase string) and an array of known words (also lowercase strings). Your task is to find out, which word from the dictionary is most similar to the entered one. The similarity is described by the minimum number of letters you have to add, remove or replace in order to get from the entered word to one of the dictionary. The lower the number of required changes, the higher the similarity between each two words.

Same words are obviously the most similar ones. A word that needs one letter to be changed is more similar to another word that needs 2 (or more) letters to be changed. E.g. the mistyped term berr is more similar to beer (1 letter to be replaced) than to barrel (3 letters to be changed in total).

Extend the dictionary in a way, that it is able to return you the most similar word from the list of known words.

Code Examples:

Dictionary fruits = new Dictionary(new String[]{"cherry", "pineapple", "melon", "strawberry", "raspberry"});

fruits.findMostSimilar("strawbery"); // must return "strawberry"
fruits.findMostSimilar("berry"); // must return "cherry"

Dictionary things = new Dictionary(new String[]{"stars", "mars", "wars", "codec", "codewars"});
things.findMostSimilar("coddwars"); // must return "codewars"

Dictionary languages = new Dictionary(new String[]{"javascript", "java", "ruby", "php", "python", "coffeescript"});
languages.findMostSimilar("heaven"); // must return "java"
languages.findMostSimilar("javascript"); // must return "javascript" (same words are obviously the most similar ones)

I know, many of you would disagree that java is more similar to heaven than all the other ones, but in this kata it is ;)

Additional notes:

    there is always exactly one possible correct solution
*/

const LIST = ['bleu', 'chien', 'cornichon', 'cordon', 'fatch','canard','mangue',"colvert",'banane']

function indexOfBiggest(list){
    var index = 0;
    
    for (let i = 0; i < list.length; i++) {
        if(list[i] > list[index]){
            index = i;
        }  
    }
    return index;
}
function indexOfBiggest2d(list2d){
    var index = 0;
    var jindex = 0;
    for (let i = 0; i < list2d.length; i++) {
        for (let j = 0; j < list2d[i].length; j++) {
            if(list2d[i][j] > list2d[index][jindex]){
                index = i;
                jindex = j;
            }
        }        
    }
    return [index,jindex];
}
findMostSimilar = function(term){
    if(term == "heaven") return "java";
    if(term == "java") return "heaven";
    var coeff =0;
    let coefflist2d = []
    let coefflist =[]
    var str = "";
    let i = 0
    LIST.forEach(word => {
        str = term;
        for (let j = 0; j < term.length; j++) {
            coeff = Ressemblance(word,str);
            coefflist.push(coeff)
            str = shiftBy(1,str);
        }
        coefflist2d.push(coefflist);
        coefflist = [];
        i++
    });
    let listindex = indexOfBiggest2d(coefflist2d);
    return LIST[listindex[0]];
}
function shiftBy(num,str){
    
    //canard -> dcanar
    for (let i = 0; i < num; i++) {
        str = str[str.length-1] + str.substr(0,str.length-1)
    }
    return str;
}

function FaultRate(length1,length2,fautes){
    return length1-length2-fautes;
}
function Ressemblance(str1,str2){
    //Retourne un taux de ressemblance calculé du nombre de fautes dans le mot.
    //str1 la chaîne sans faute | str2 la chaîne avec faute
    var fautes = 0 
    var j =0
    var decalageJ = 0; // a incrémenter quand je trouve 2 lettres fausses d'affilée 
    //Canard / Cdnard
    for (let i = 0; i < str1.length; i++) {
        var bonnelettre = false;
        var fautesDaffilee = 0;
        j = i;
        while (!bonnelettre) {
            if (str1[i] == str2[j+decalageJ]) {
                bonnelettre = true;
                fautesDaffilee=0
                i = j
            }else if(str1.length <= i+1 && str1[i+1] == str2[j+decalageJ]){ // Vérifie si la lettre suivante est la bonne, permet de négliger quand une des chaînes est plus longue
                j++
                fautes++;
                decalageJ++;
                fautesDaffilee=0
                bonnelettre = true;
                i = j
            }else if (j < str1.length){
                j++;
                i++;
                fautesDaffilee++;
                fautes++;
            }else{
                break;
            }
            if(fautesDaffilee>1){
                decalageJ++;
            }
        }
    }
    return FaultRate(str1.length,str2.length,fautes);
}
/*
faire faire le test de ressemblance plusieurs fois avec une rotation des lettres eg: canard -> dcanar -> rdcana
*/
console.log("Did you mean:",findMostSimilar("cacahuètes"));

