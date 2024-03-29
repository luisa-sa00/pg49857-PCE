let CareTakerSchema = require('../model/caretaker');

module.exports.newCaretaker = async (id, name) => {
    try {
        let care_taker = new CareTakerSchema ({ id: id, name: name });
        let response = await care_taker.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}