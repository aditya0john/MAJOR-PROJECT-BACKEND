import multiparty from "multiparty";

export default async function handle(req, res) {
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    console.log(files.file.length);
    res.json("ok");
  });
}

export let config = {
  api: { bodyParser: false },
};
