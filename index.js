//DEPENDENCIES
const fs = require("fs");//filesystem
const Jimp = require('jimp');


var name = "project name";
var usedIDs = [];

/*TO DO
FIX METADATA ID RANDOMIZER 
-ADD RANDOM ID GENERATOR
-ADD ARRAY THAT TRACKS THE IDS THAT HAVE BEEN USED / FIND THE SYNTAX TO CHECK IF A FILE EXISTS(WOULD BE BETTER)

*/


const randomNumGenerator = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//JSON Writer
const saveMetadata = (_NFTID, _data) => {
    //CHANGE .JSON ACCORDING TO YOUR FILE'S EXTENSION
    fs.writeFileSync("./output/metadata/" + _NFTID, JSON.stringify(_data));
};

const MetadataIdChanger = (currentID, newID) => {
  
    var path = "./input/metadata/" + currentID + ".json";
  
    fs.readFile(path, async (err, data)  => {
    //if error show it
    if (err) throw err;
    //if no error
    const tempJSON = JSON.parse(data);//getting JSON data object

    tempJSON.name = name + " #" + newID;

  
    saveMetadata(newID, tempJSON);//writing new metadata file
    console.log("Metadata ID:" + currentID + " has been changed to " + newID + " .");//Showing which one is done
    })
};


const imageRename = async (currentID ,newID) => {

    //change according to your path
    const image = await Jimp.read("./input/images/" + currentID +"#1.png");
 image.flip(false, false, function(err){
    if (err) throw err;
 })
  .write("./output/images/" + newID + ".png");
 console.log("Image ID:" + currentID + " has been changed to " + newID + " .")
}


 

const RandomizeIDs = (startingID, finishID) => {
    var randomNum = 0;
    usedIDs.push(randomNum);
    

    for(let current = startingID; current <= finishID; current++){

        

        while(usedIDs.includes(randomNum)){
            console.log("ID: " + randomNum + " exists.")
            randomNum = randomNumGenerator(startingID, finishID);
            
        }

        usedIDs.push(randomNum);

        console.log(randomNum + " will be assigned now");

        MetadataIdChanger(current, randomNum);
        imageRename(current, randomNum);

    }


}


RandomizeIDs(1,3000);


