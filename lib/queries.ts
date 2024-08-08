import { contract } from "./index";

interface parseErrorMsgProps {
  e: any;
}

function parseErrorMsg({ e }: parseErrorMsgProps) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}

export async function getUsernameByAddress(userAddress: any) {
  try {
    const contractObj = await contract();
    const username = await contractObj?.getUsernameByAddress(userAddress);
    return username;
  } catch (error) {
    console.log(error);
    return parseErrorMsg({ e: error });
  }
}

export async function createUser(
  username: any,
  basicInfo: any,
  professionalInfo: any,
  socialLinks: any,
  visibility: any,
) {
  try {
    const contractObj = await contract();
    const transactionResponse = await contractObj?.createUser(
      username,
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility,
    );

    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (error) {
    console.error("Error in createUser:", error);
    return parseErrorMsg(error as any);
  }
}

export async function editUser(
  username: any,
  basicInfo: any,
  professionalInfo: any,
  socialLinks: any,
  visibility: any,
) {
  try {
    const contractObj = await contract();
    const transactionResponse = await contractObj?.editUser(
      username,
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility,
    );

    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (error) {
    console.error("Error in editUser:", error);
    return parseErrorMsg(error as any);
  }
}

// userByUsername

export async function getUserByUsername(username: any) {
  try {
    const contractObj = await contract();
    const user = await contractObj?.getUserByUsername(username);
    return {
      basicInfo: {
        firstName: user?.basicInfo.firstName,
        lastName: user?.basicInfo.lastName,
        email: user?.basicInfo.email,
        homeAddress: user?.basicInfo.homeAddress,
        dateOfBirth: user?.basicInfo.dateOfBirth,
        phoneNumber: user?.basicInfo.phoneNumber,
      },

      professionalInfo: {
        education: user.professionalInfo.education,
        workHistory: user.professionalInfo.workHistory,
        jobTitle: user.professionalInfo.jobTitle,
        info: user.professionalInfo.info,
        skills: user.professionalInfo.skills,
        imageURL: user.professionalInfo.imageURL,
      },
      socialLinks: {
        x: user.socialLinks.x,
        instagram: user.socialLinks.instagram,
        tiktok: user.socialLinks.tiktok,
        youtube: user.socialLinks.youtube,
        linkedin: user.socialLinks.linkedin,
      },
      visibility: {
        education: user.visibility.education,
        workHistory: user.visibility.workHistory,
        phoneNumber: user.visibility.phoneNumber,
        homeAddress: user.visibility.homeAddress,
        dateOfBirth: user.visibility.dateOfBirth,
      },
    };
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    return parseErrorMsg(error as any);
  }
}

export async function getUserByAddress(userAddress: any) {
  try {
    const contractObj = await contract();
    const user = await contractObj?.getUserByAddress(userAddress);
    return {
      basicInfo: {
        firstName: user.basicInfo.firstName,
        lastName: user.basicInfo.lastName,
        email: user.basicInfo.email,
        homeAddress: user.basicInfo.homeAddress,
        dateOfBirth: user.basicInfo.dateOfBirth,
        phoneNumber: user.basicInfo.phoneNumber,
      },
      professionalInfo: {
        education: user.professionalInfo.education,
        workHistory: user.professionalInfo.workHistory,
        jobTitle: user.professionalInfo.jobTitle,
        info: user.professionalInfo.info,
        skills: user.professionalInfo.skills,
        imageURL: user.professionalInfo.imageURL,
      },
      socialLinks: {
        x: user.socialLinks.x,
        instagram: user.socialLinks.instagram,
        tiktok: user.socialLinks.tiktok,
        youtube: user.socialLinks.youtube,
        linkedin: user.socialLinks.linkedin,
      },
      visibility: {
        education: user.visibility.education,
        workHistory: user.visibility.workHistory,
        phoneNumber: user.visibility.phoneNumber,
        homeAddress: user.visibility.homeAddress,
        dateOfBirth: user.visibility.dateOfBirth,
      },
    };
  } catch (error) {
    console.error("Error in getUserByAddress:", error);
    return parseErrorMsg(error as any);
  }
}

export async function addJob(username: any, jobId: any) {
  try {
    const contractObj = await contract();
    const transactionResponse = await contractObj?.addJob(username, jobId);
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (error) {
    console.error("Error in addJob:", error);
    return parseErrorMsg(error as any);
  }
}

// Function to get all job IDs applied by a user
export async function getJobs(username: any) {
  try {
    const contractObj = await contract();
    const jobIds = await contractObj?.getJobs(username);
    return jobIds.map((jobId: any) => jobId.toString());
  } catch (error) {
    console.error("Error in getJobs:", error);
    return parseErrorMsg(error as any);
  }
}

// Function to set the visibility of user information
export async function setVisibility(
  username: any,
  education: any,
  workHistory: any,
  phoneNumber: any,
  homeAddress: any,
  dateOfBirth: any,
) {
  try {
    const contractObj = await contract();
    const transactionResponse = await contractObj?.setVisibility(
      username,
      education,
      workHistory,
      phoneNumber,
      homeAddress,
      dateOfBirth,
    );
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (error) {
    console.error("Error in setVisibility:", error);
    return parseErrorMsg(error as any);
  }
}

// Function to get the visibility of user information
export async function getVisibility(username: any) {
  try {
    const contractObj = await contract();
    const visibility = await contractObj?.getVisibility(username);
    return {
      education: visibility.education,
      workHistory: visibility.workHistory,
      phoneNumber: visibility.phoneNumber,
      homeAddress: visibility.homeAddress,
      dateOfBirth: visibility.dateOfBirth,
    };
  } catch (error) {
    console.error("Error in getVisibility:", error);
    return parseErrorMsg(error as any);
  }
}
