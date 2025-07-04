
export const generateTokenAndSetCookies = async (user, res) => {
    const token = await user.generateToken(user._id);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // Required for cross-site cookies on HTTPS
        sameSite: "None",    // Required for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}