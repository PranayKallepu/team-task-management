import AppError from "#src/utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (parsed.body) req.body = parsed.body;
    if (parsed.query) req.query = parsed.query;
    if (parsed.params) req.params = parsed.params;

    next();
  } catch (error) {
    if (error.errors) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.length > 1 ? err.path.slice(1).join(".") : err.path.join("."),
        message: err.message,
      }));

      throw new AppError("Validation failed", 400, formattedErrors);
    }

    throw error;
  }
};
