import algoliasearch from "algoliasearch";

const client = algoliasearch('KSPJZUAPNP','4a518a4dc12272b67f69d20ee878a46b');
const algolia = client.initIndex('soicalcool');

export default algolia;