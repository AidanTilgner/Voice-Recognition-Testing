## Summary

The point of this repository is to catalog different implementations of Speech recognition. The scores will be made based on the following criteria:

- 1. Accuracy - It's very important that the text is recognized correctly. The accuracy will be measured by the Levenshtein distance between the recognized text and the original text. Each rating will be based on the sentence "How much wood would a woodchuck chuck if a woodchuck could chuck wood?".
- 2. Ease of use - This is important because some of the implementations are very complicated to use. The ease of use will be measured by the number of steps required to be able to speak into a microphone and have speech returned to you. This will also be roughly measured by how many lines of code are required to implement the speech recognition.
- 3. Offline Access - It's important to me that the speech recognition can be entirely self-contained. This is for privacy and redundancy's sake. Because of this, the offline access will be either a 1 or a 0. 1 if the speech recognition can be used offline, 0 if it cannot.
- 4. Expandability - This might seem like the opposite of Ease of Use, but I intend them to be in different categories. I want to be able to implement something easily, but have the ability to dip into the low level aspects of the speech recognition. For example, if all the implementation does is reach out to an API, then it's not very expandable. If it's a self-contained implementation with all of the source code available, then it's very expandable. This will be measured by the number of lines of code required to implement the speech recognition.

## Implementations

### Vanilla:

The vanilla version is just using the speech recognition API in Google Chrome browser. It's simple, but only available on Chrome browser for the implementation I'm using. Because of this, it's a loose test.
_score_
Accuracy: 99.9% - This api is extremely accurate
Ease of Use: 3/5 - It's just a few lines of code
Offline Access: 0/1 - It's not available offline
Expandability: 2/5 - It's not very expandable since it reaches out to an API, on top of that, it's not available on other browsers.

### Vosk:

This one I haven't gotten to work yet, so it's score is 0
