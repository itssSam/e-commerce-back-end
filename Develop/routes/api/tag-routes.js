const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  // Try to find all tags and include their associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err){
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single tag by its ID
router.get('/:id', async (req, res) => {
  // Try to find a single tag by its `id` and include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If the tag does not exist, send a 404 response
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(500).json(err);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  // Try to create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(400).json(err);
  } 
});

// PUT (update) a tag's name by its ID
router.put('/:id', async (req, res) => {
  // Try to update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    // If no rows were updated (tag not found), send a 404 response
    if (!updateTag[0]) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE a tag by its ID
router.delete('/:id', async (req, res) => {
  // Try to delete a tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no rows were deleted (tag not found), send a 404 response
    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    // Handle any errors that occur during the operation
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;