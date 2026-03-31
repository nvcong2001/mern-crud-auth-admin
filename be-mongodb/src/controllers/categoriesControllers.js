import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    const search = (req.query.search || "").toString();
    const isActiveRaw = req.query.isActive;

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const filter = {};

    if (search && search.trim() !== "") {
      filter.name = { $regex: new RegExp(search.trim(), "i") };
    }

    if (isActiveRaw === "true" || isActiveRaw === "false") {
      filter.isActive = isActiveRaw === "true";
    }

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      Category.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Category.countDocuments(filter),
    ]);

    const data = categories.map((cat) => {
      const obj = cat.toObject();
      return {
        ...obj,
        id: obj._id,
      };
    });

    res.status(200).json({
      data,
      meta: {
        total,
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Lỗi getAllCate", error);
    res.status(500).json({ message: "Lỗi system" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const getCategory = await Category.findById(req.params.id);

    if (!getCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(getCategory);
  } catch (error) {
    console.error("Lỗi get cate byid", error);
    res.status(500).json({ message: "Lỗi system" });
  }
};

export const createCategories = async (req, res) => {
  try {
    const { name, slug, isActive } = req.body;
    const category = new Category({ name, slug, isActive });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Lỗi create cate", error);
    res.status(500).json({ message: "Lỗi system" });
  }
};

export const updateCategories = async (req, res) => {
  try {
    const { name, slug, isActive } = req.body;
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        isActive,
      },
      { new: true },
    );

    if (!updateCategory) {
      return res.status(404).json({ messege: " Không tồn tại" });
    }

    res.status(200).json(updateCategory);
  } catch (error) {
    console.error("Lỗi update cate", error);
    res.status(500).json({ message: "Lỗi system" });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deleteCategory) {
      return res.status(404).json({ message: "Không tồn tại" });
    }

    res.status(200).json(deleteCategory);
  } catch (error) {
    console.error("Lỗi delete cate", error);
    res.status(500).json({ message: "Lỗi system" });
  }
};
