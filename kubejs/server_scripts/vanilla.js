/*ServerEvents.modify((e) => {///??? see wiki for item.modification
    e.modify('minecraft:milk_bucket', item => {
      item.maxStackSize = 16
    })
    e.modify('minecraft:ender_pearl', item => {
      item.maxStackSize = 64
    })
  })*/

ServerEvents.tags('item', (e) => {
e.add('minecraft:pressure_plates', 'minecraft:stone_pressure_plate')
e.add('minecraft:pressure_plates', 'minecraft:polished_blackstone_pressure_plate')
})


ServerEvents.recipes( (e) => {
/* Wood:
Block           [6000 EU] = 2 Slabs
Stairs          [6000 EU] = 1 Blocks?? mb + sawdust
Slabs           [3000 EU] = 0.5 Blocks
Button          [2000 EU] = 1/3 of a Block
Pressure PLate  [6000 EU] = 1 Block?? (3 buttons lol)
Door            [4000 EU] = 2/3 of a block (6 blocks would give 9 doors)
Trapdoor        [6000 EU] = 1 Block
Fence           [6000 EU] = 1 Block
Fence Gate      [6000 EU] = 1 Block
Sign            [4000 EU] = 2/3 of a block (6 blocks would give 9 signs)
*/


//BLOCKS and SLABS

e.forEachRecipe({ type: 'minecraft:crafting_shaped', output: '#minecraft:slabs' }, r => {
    let ingredient = r.originalRecipeIngredients // returns a List<Ingredient>
    let output = r.originalRecipeResult           // returns an ItemStack
    e.shaped(Item.of(output.id, 4), ['XX'], { X: ingredient }).id(r.getOrCreateId())//2 Blocks = 4 Slabs
    e.shaped(ingredient[0], ['XX'], { X: output })// 2 slabs = block uncrafting
})

//STAIRS

e.forEachRecipe({ type: 'minecraft:crafting_shaped', output: '#minecraft:stairs' }, r => {
    let ingredient = r.originalRecipeIngredients
    let output = r.originalRecipeResult
    e.shaped(Item.of(output.id, 4), ['X ', 'XX'], { X: ingredient }).id(r.getOrCreateId())//4 stairs = 3 blocks
    e.shapeless(Item.of(ingredient[0], 3), output)//4 stairs = 3 blocks SHAPELESS uncrafting
})

//BUTTONS

e.forEachRecipe({ type: 'minecraft:crafting_shapeless', output: '#minecraft:buttons' }, r => {
    let ingredient = r.originalRecipeIngredients
    let output = r.originalRecipeResult
    e.shapeless(Item.of(output.id, 3), ingredient).id(r.getOrCreateId())// 1 plank = 3 buttons (burn time consistent)
    //mb pressure plates here?
})

//PRESSURE PLATES (3 buttons to 1 pp)

e.forEachRecipe([{ type: 'minecraft:crafting_shaped', output: '#minecraft:pressure_plates'}, { type: 'minecraft:crafting_shaped', output: '#minecraft:wooden_pressure_plates'}], r => {
    let output = r.originalRecipeResult
    e.shapeless(output, `3x ${output.id.replace('pressure_plate', 'button')}` ).id(r.getOrCreateId())
})

//DOORS



//TRAPDOORS

e.forEachRecipe({ type: 'minecraft:crafting_shaped', output: '#minecraft:wooden_trapdoors' }, r => {
    let ingredient = r.originalRecipeIngredients
    let output = r.originalRecipeResult
    e.shaped(Item.of(output.id, 3), ['XXX'], { X: ingredient }).id(r.getOrCreateId())// 3 planks = 3 wooden trapdoors (16 pixel consistent, 3 burn time consistent)
})

})

