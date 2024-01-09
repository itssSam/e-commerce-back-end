const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  // Log a message for debugging
  console.log("category");
  
  // Try to find all categories and include their associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a category by ID
router.get('/:id', async (req, res) => {
  // Try to find one category by its `id` value and include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    
    // If the category does not exist, send a 404 response
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    
    res.status(200).json(category);
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  // Try to create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  // Try to update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // If no rows were updated (category not found), send a 404 response
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category not found '});
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  // Try to delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    // If no rows were deleted (category not found), send a 404 response
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;