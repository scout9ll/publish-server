const bffAxios = require("./request.js");
const publishLogMutation = `mutation CreatePublishLog($input: PublishLogInput!) {
    createPublishLog(input: $input) {
    id
  }
}`;

const postPublishLog = async (data) => {
  const input = {
    branch: data.branch.name,
    remark: data.desc,
    time: data.time,
    publisher: data.publishUser,
    description: data.branch.commitDesc,
    commitId: data.branch.commitId,
    projectType: 0,
    clientName: data.projectName,
  };
  return bffAxios.post("/graphql", {
    query: publishLogMutation,
    variables: { input },
  });
};

module.exports = { postPublishLog };
