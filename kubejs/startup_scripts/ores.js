WorldgenEvents.remove(e => {
// remove ores from "mekanism", "immersive_engineering" and "occultism"
let mc = (id) => `minecraft:${id}`;
let mk = (id) => `mekanism:${id}`;
let ie = (id) => `immersive_engineering:${id}`;


const REMOVED_ORES = [
    mk('tin_ore'),
    mk('lead_ore')
];

e.removeOres(ores => {
    ores.blocks = REMOVED_ORES;
});

 
})