import apiReturn from "../utils/apiReturn.util.js";

import axios from "axios";
import "dotenv/config";
import fs from "fs-extra";
import pinata from "../configs/pinata.config.js";

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;
const PINATA_GATEWAY_TOKEN = process.env.PINATA_GATEWAY_TOKEN;
const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_API_URL = process.env.PINATA_API_URL;
const PINATA_KAKAROTTO_CHARACTER_GROUP_CID =
  process.env.PINATA_KAKAROTTO_CHARACTER_GROUP_CID;
const PIN_JSON_TO_IPFS_API_URL =
  "https://api.pinata.cloud/pinning/pinJSONToIPFS";
const PINT_FILE_TO_IPFS_API_URL =
  "https://api.pinata.cloud/pinning/pinFileToIPFS";

const testConnection = async () => {
  try {
    const auth = await pinata.testAuthentication();
    return apiReturn.success(200, "Connection Test Successfully", auth.message);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error testing connection to Pinata");
  }
};

// const updateMetadata = async ({ groupId, metadata, fileName }) => {
//   try {
//     const data = {
//       pinataContent: metadata,
//       pinataOptions: {
//         cid: groupId,
//       },
//       pinataMetadata: {
//         name: fileName,
//       },
//     };
//     if (!name && !metadata) return apiReturn.error(400, "No data to update");
//     const update = await pinata.updateMetadata(updateData);
//     return apiReturn.success(200, "Updating Successfully", update);
//   } catch (error) {
//     console.log(error);
//     return apiReturn.error(400, "Error updating Metadata to Pinata");
//   }
// };

const uploadFiles = async ({ files, groupId }) => {
  try {
    if (!files.length) {
      return apiReturn.error(400, "No file to upload");
    }
    const uploadPromises = files.map(async (file) => {
      const blobFile = new Blob([file.buffer], { type: "image/png" });
      const imageName = file.originalname.split(".jpeg")[0];
      const form = new FormData();
      form.append("file", new File([blobFile], imageName));
      form.append("pinataOptions", JSON.stringify({ groupId }));
      const response = await axios.post(PINT_FILE_TO_IPFS_API_URL, form, {
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        filename: file.originalname,
        cid: response.data.IpfsHash,
      };
    });
    const results = await Promise.all(uploadPromises);
    return apiReturn.success(200, "Uploading Successfully", results);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error uploading File to Pinata");
  }
};
const uploadMetadata = async ({ groupId, metadata, fileName }) => {
  try {
    const data = {
      pinataContent: metadata,
      pinataOptions: {
        groupId: groupId,
      },
      pinataMetadata: {
        name: fileName,
      },
    };
    const res = await axios.post(PIN_JSON_TO_IPFS_API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });
    console.log(res.data);
    return apiReturn.success(200, "Uploaded Successfully", res.data);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error uploading JSON to Pinata");
  }
};
const fetchFile = async ({ groupId, cid }) => {
  try {
    const response = await axios.get(
      `${PINATA_API_URL}/data/pinList?status=pinned${
        groupId ? `&groupId=${groupId}` : ""
      }${cid ? `&cid=${cid}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
      }
    );
    return apiReturn.success(200, "Fetched Successfully", response.data);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Error fetching random image in folder");
  }
};

export { testConnection, uploadFiles, uploadMetadata, fetchFile };
