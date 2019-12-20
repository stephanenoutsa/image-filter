// Third party modules
import { Request, Response } from "express";

// Helper functions
import { filterImageFromURL, deleteLocalFiles } from "../../../util/util";

// Get filtered image
export const getFilteredImage = async (req: Request, res: Response) => {
  const { image_url } = req.query;

  if (image_url) {
    try {
      // Get filtered image
      const filteredImage = await filterImageFromURL(image_url);

      const imageArray: Array<string> = [];
      imageArray.push(filteredImage);

      // Send filtered image in response
      res.sendFile(filteredImage);

      // Delete image from server after response is sent
      res.on("finish", () => {
        deleteLocalFiles(imageArray);
      });
    } catch (err) {
      return res
        .status(500)
        .send(
          "There was an error processing your image. Please make sure the URL you provided is valid."
        );
    }
  } else {
    return res
      .status(422)
      .send("Please submit a valid image URL in your request.");
  }
};
