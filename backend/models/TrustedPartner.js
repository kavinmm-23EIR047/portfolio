import mongoose from 'mongoose';

const trustedPartnerSchema = mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TrustedPartner = mongoose.model('TrustedPartner', trustedPartnerSchema);

export default TrustedPartner;
