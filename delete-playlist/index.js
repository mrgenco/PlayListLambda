const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region: "eu-central-1",
});
exports.handler = async (event) => {
  try {
    var params = {
      Key: {
        UserId: {
          S: "1234562222",
        },
      },
      TableName: "categories",
    };
    const data = await dynamodb.deleteItem(params).promise();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
