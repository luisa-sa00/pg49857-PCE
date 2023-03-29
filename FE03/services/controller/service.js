let ServiceSchema = require('../model/service');

module.exports.newService = async (serviceid, servicedesc) => {
    try {
        let service = new ServiceSchema ({ serviceID: serviceid, serviceDesc: servicedesc });
        let response = await service.save();
        return { success: true, response };
    } catch(err) {
        console.log(err);
        return { success: false, response: err};
    }
}