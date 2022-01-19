const bcrypt = require('bcryptjs')
const { User } = require('../../models')

const patchPas = async (req, res, next) => {
  try {
    const { id } = req.user
    const { password } = req.body
    const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const findUser = await User.findById(id)
    if (!findUser) {
      return res.status(404).json({ message: 'Not Found' })
    }
    await User.findByIdAndUpdate(id, { password: newPassword })
    res.status(200).json({
      message: 'Password status updated'
    })
  } catch (error) {
    next(error.message)
  }
}

module.exports = patchPas
