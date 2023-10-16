// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/Users");
const bcrypt = require('bcrypt')

// module.exports = function (passport) {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID, //It has to be bought from google cloud platform
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID, //It has to be bought from google cloud platform
//         callbackURL: "/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         //console.log(profile);
//         const newUser = {
//           googleId: profile._json.sub,
//           displayName: profile._json.name,
//           firstName: profile._json.given_name,
//           lastName: profile._json.family_name,
//           image: profile._json.picture,
//         };
//         try {
//           let user = await User.findOne({ googleId: profile._json.sub });
//           if (user) {
//             done(null, user);
//           } else {
//             user = await User.create(newUser);
//             done(null, user);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (error, user) => {
//       done(error, user);
//     });
//   });
// };


module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      async (username, password, done) => {
        try {
          let user = await User.findOne({ email: username });

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return done(null, false, { message: 'Incorrect email or password.' });

          return done(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};
