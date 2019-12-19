// Third party modules
import { Request, Response } from "express";

// Helper functions
import { filterImageFromURL, deleteLocalFiles } from "../../../util/util";

// Get filtered image
export const getFilteredImage = async (req: Request, res: Response) => {
  const { image_url } = req.query;

  if (image_url) {
    // Get filtered image
    const filteredImage = await filterImageFromURL(image_url);

    // Send filtered image in response
    res.sendFile(filteredImage);

    const imageArray = [];
    imageArray.push(filteredImage);

    // Delete image from server after response is sent
    deleteLocalFiles(imageArray);
  }

  return res.status(400).send("Please submit the image URL in your request");
};
