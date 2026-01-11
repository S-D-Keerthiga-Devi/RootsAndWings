import User from "../models/user";

export const getUser = async (req, res) => {
    const { clerkid, email, name, imageUrl } = req.body

    try {
        let user = await User.findOne({ clerkid });

        if (user) {
            // User exists - return them (so frontend knows their role)
            return res.status(200).json(user);
        }

        // 2. User doesn't exist - Create new one
        user = new User({
            clerkid,
            email,
            name,
            imageUrl,
            role: null // Role is null until they select it
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const updateUserRole = async (req, res) => {
    const { clerkId, role } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { clerkId }, 
        { role }, 
        { new: true } // Returns the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error updating role:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };