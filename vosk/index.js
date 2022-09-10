import { setLogLevel, Model, Recognizer } from "vosk";
import { existsSync, createReadStream } from "fs";
import { Readable } from "stream";
import { Reader } from "wav";

const MODEL_PATH = "model";
const FILE_NAME = "../tests/how_much_wood.wav";

if (!existsSync(MODEL_PATH)) {
  console.log(
    "Please download the model from https://alphacephei.com/vosk/models and unpack as " +
      MODEL_PATH +
      " in the current folder."
  );
  process.exit();
}

if (process.argv.length > 2) FILE_NAME = process.argv[2];

setLogLevel(0);
const model = new Model(MODEL_PATH);

const wfReader = new Reader();
const wfReadable = new Readable().wrap(wfReader);

wfReader.on("format", async ({ audioFormat, sampleRate, channels }) => {
  if (audioFormat != 1 || channels != 1) {
    console.error("Audio file must be WAV format mono PCM.");
    process.exit(1);
  }
  const rec = new Recognizer({ model: model, sampleRate: sampleRate });
  rec.setMaxAlternatives(10);
  rec.setWords(true);
  rec.setPartialWords(true);
  for await (const data of wfReadable) {
    const end_of_speech = rec.acceptWaveform(data);
    if (end_of_speech) {
      console.log(JSON.stringify(rec.result(), null, 4));
    } else {
      console.log(JSON.stringify(rec.partialResult(), null, 4));
    }
  }
  console.log(JSON.stringify(rec.finalResult(rec), null, 4));
  rec.free();
});

createReadStream(FILE_NAME, { highWaterMark: 4096 })
  .pipe(wfReader)
  .on("finish", function (err) {
    model.free();
  });
