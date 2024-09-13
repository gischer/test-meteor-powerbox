@0xa9c31852107446ce;  # generated using `capnp id`

using Powerbox = import "/sandstorm/powerbox.capnp";
using ApiSession = import "/sandstorm/api-session.capnp".ApiSession;


const myTagValue :ApiSession.PowerboxTag = (
  canonicalUrl = "https://sot-images.sweetvinesystems.com",
  # (See the definition of `ApiSession.PowerboxTag` in `api-session.capnp`
  # for more about the meaning of `canonicalUrl`.)
);

const myDescriptor :Powerbox.PowerboxDescriptor = (
  # Our descriptor has one tag, whose ID is `ApiSession`'s type ID, and
  # whose value is the tag value defined above.
  tags = [
    (id = 0xc879e379c625cdc7, value = .myTagValue)
  ],
);
