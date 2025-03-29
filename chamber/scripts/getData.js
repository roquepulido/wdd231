export { getDataDirectory };

async function getDataDirectory() {
  const url = "./data/members.json";
  return await fetch(url).then((r) => r.json());
}
