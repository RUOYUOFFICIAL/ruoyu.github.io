function getConfig() {
  fetch('')
    .then(function (response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function (jsonData) {
      // 处理jsonData
      console.log(jsonData);
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message
      );
    });
}
