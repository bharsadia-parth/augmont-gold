import bcrypt from "bcrypt"

export default async function generatePassword(plainText: string) {
    try{
        const result = await bcrypt.hash(plainText, 5);
        return result;
    }catch(e){
        throw e;
    }
}