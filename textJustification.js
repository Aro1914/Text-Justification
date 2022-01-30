// Please carefully read up the instructions to use this code efficiently.

let arrayOfWords = ["This", "is", "an", "example", "of", "text", "justification."]; //If you have an array of words, and have replaced the content of this one with that, then change the argument on the justify call from 'rawString' to 'arrayOfWords'.
let rawString = 'This is an example of text justification.';
rawString = rawString.split(' '); //If you are using 'arrayOfWords' as the argument for the justify call, you can optionally comment out this entire line.
let maxWidth = 16; //This value must be equal to or greater than the length of the biggest word on whatever you pass to the 'arrayOfWords' or the 'sample' variable.


/**
 * This justifies an array of words to the specified character length.
 * @param {Array<String>} words 
 * @param {int} maxWidth 
 * @returns Array<String>
 */
const justify = (words, maxWidth) => {
    let index = 0,
        currentLine = '',
        justified = [];

    if (words.length == 1) {
        return[words[index].padEnd(maxWidth, " ")];
    }

    const pad = (line, charLimit) => {
        if (line.indexOf(' ') === -1) {
            line = line.padEnd(charLimit, ' ');
            return line;
        }

        let words = line.split(' ');

        let minLine = words.reduce((p, c, cI, arr) => {
            return p + c;
        });

        const spaces = charLimit - minLine.length;

        for (let index = 0, i = 0; i < spaces; i++, index++) {
            if (index == (words.length - 1)) {
                index = 0;
            }
            words[index] = `${words[index]} `;
        }

        line = words.reduce((p, c, cI, arr) => {
            return p + c;
        });

        return line;
    }

    let nextWord = words[index + 1];

    const breakLine = () => {
        currentLine = `${words[index]}`;
        nextWord = words[index + 1];

        while (nextWord && words.indexOf(words[index]) <= words.length) {
            if ((currentLine.length + nextWord.length + 1) > maxWidth) {
                justified.push(pad(currentLine, maxWidth));
                if ((words.indexOf(nextWord)) == words.length - 1) {
                    currentLine = `${nextWord}`;
                    justified.push(pad(currentLine, maxWidth));
                    break;
                } else {
                    index++;
                    currentLine = `${words[index]}`;
                    nextWord = words[index + 1];
                }
            } else if ((currentLine.length + nextWord.length + 1) == maxWidth) {
                currentLine += ` ${nextWord}`;
                justified.push(currentLine);

                if ((words.indexOf(nextWord) + 1) == words.length - 1) {
                    currentLine = `${words[(words.indexOf(nextWord)+1)]}`;
                    justified.push(pad(currentLine, maxWidth));
                    break;
                } else {
                    index += 2;
                    currentLine = `${words[index]}`;
                    nextWord = words[index + 1];
                }
            } else if ((currentLine.length + nextWord.length + 1) < maxWidth) {
                while (nextWord && (currentLine.length + nextWord.length + 1) <= maxWidth) {
                    currentLine += ` ${nextWord}`;
                    index++;
                    nextWord = words[index + 1];
                }

                justified.push(pad(currentLine, maxWidth));


                if ((words.indexOf(nextWord)) == words.length - 1) {
                    currentLine = `${nextWord}`;
                    justified.push(pad(currentLine, maxWidth));
                    break;
                } else {
                    index++;
                    currentLine = `${words[index]}`;
                    nextWord = words[index + 1];
                }
            }
        }

        let brokenLLine = justified[justified.length - 1].split(' ');

        let minLLine = brokenLLine.reduce((p, c, cI, arr) => {
            if (c) {
                return `${p} ` + c;
            } else {
                return p + c;
            }
        });

        justified[justified.length - 1] = minLLine.padEnd(maxWidth, " ");
    }

    breakLine();

    return justified;
}

console.log(justify(rawString, maxWidth));