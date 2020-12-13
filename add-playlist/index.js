const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region: "eu-central-1",
});

exports.handler = async (event) => {
  var playlist = {};
  playlist.name = event.name;
  playlist.desc = event.desc;
  playlist.userId = "1234562222";
  playlist.categoryId = playlist.userId.concat(playlist.name);

  const params = {
    Key: {
      UserId: {
        S: playlist.userId,
      },
      CategoryId: {
        S: playlist.categoryId,
      },
      CategoryName: {
        S: playlist.name,
      },
      CategoryDesc: {
        S: playlist.desc,
      },
    },
    TableName: "categories",
  };

  try {
    const data = await dynamodb.putItem(params).promise();
    console.log("SUCCESS : " + data);
    const response = {
      statusCode: 200,
      body: JSON.stringify(playlist),
    };
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
