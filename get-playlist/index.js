const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region: "eu-central-1",
});

exports.handler = async (event) => {
  try {
    const type = event.type;
    if (type == "all") {
      const params = {
        TableName: "categories",
      };
      const data = await dynamodb.scan(params).promise();
      console.log("SUCCESS : " + data);
      const items = data.Items.map((dataField) => {
        return {
          categoryName: dataField.CategoryName.S,
          categoryId: dataField.CategoryId.S,
          categoryDesc: dataField.CategoryDesc.S,
        };
      });
      return items;
    } else if (type == "single") {
      var params = {
        Key: {
          UserId: {
            S: "1234562222",
          },
        },
        TableName: "categories",
      };
      const data = await dynamodb.getItem(params).promise();
      const response = {
        categoryName: data.Item.CategoryName.S,
        categoryId: data.Item.CategoryId.S,
        categoryDesc: data.Item.CategoryDesc.S,
      };
      console.log("SUCCESS : " + data);
      return response;
    } else {
      return "Query type must be single or all!";
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
