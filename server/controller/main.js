function getStatus(req, res) {
  res.send({
    status: "ok"
  });
}

export default { getStatus };
