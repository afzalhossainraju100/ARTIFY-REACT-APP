import React from "react";

const Requirement = () => {
  return (
    <section
      style={{
        padding: 20,
        lineHeight: 1.8,
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ borderBottom: "3px solid #667eea", paddingBottom: 10 }}>
        🎨 Artify - Project Documentation
      </h1>

      <h2>What is Artify?</h2>
      <p>
        Artify is an online art marketplace where artists can upload and sell
        their digital artwork, and buyers can browse, purchase, and support
        creators. Think of it like Etsy but specifically designed for digital
        art with fast payments and easy uploads.
      </p>

      <h2>Who will use it?</h2>
      <ul>
        <li>
          <strong>Artists:</strong> Upload their work (with image links), set
          prices, manage sales, view earnings
        </li>
        <li>
          <strong>Buyers:</strong> Browse art, search by categories, purchase
          securely with Stripe, track orders
        </li>
        <li>
          <strong>Me (Admin):</strong> Monitor platform, manage users, track
          payments, fix issues
        </li>
      </ul>

      <h2>MVP Features I'm Building (First 4 Days)</h2>
      <ul>
        <li>✅ User authentication (email signup/login + Google sign-in)</li>
        <li>✅ Browse artworks with search & category filter</li>
        <li>✅ Artist dashboard to upload & manage their artwork</li>
        <li>✅ View artist profiles (public pages)</li>
        <li>✅ Shopping cart & checkout</li>
        <li>✅ Stripe payment integration</li>
        <li>✅ User profiles with purchase history</li>
      </ul>

      <h2>Tech Stack (What I'm Using)</h2>
      <div
        style={{
          backgroundColor: "#f0f4ff",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <p>
          <strong>Frontend:</strong> React + Vite (fast dev server, quick
          builds)
        </p>
        <p>
          <strong>Database:</strong> MongoDB Atlas (collection-based database,
          scalable and easy to query)
        </p>
        <p>
          <strong>Authentication:</strong> Firebase Auth (email + Google OAuth)
        </p>
        <p>
          <strong>Image Storage:</strong> Firebase Storage (CDN for fast image
          delivery)
        </p>
        <p>
          <strong>Payments:</strong> Stripe (most reliable payment processor)
        </p>
        <p>
          <strong>Hosting:</strong> Vercel or Netlify (free tier, auto-deploy,
          built-in SSL)
        </p>
      </div>

      <h2>How Data Flows</h2>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <p>1. User opens app → loads from Vercel/Netlify CDN</p>
        <p>2. Logs in → Firebase Auth handles it</p>
        <p>3. Browses art → fetches from MongoDB</p>
        <p>4. Clicks "Buy" → creates Stripe payment</p>
        <p>5. Payment succeeds → saves order in MongoDB</p>
        <p>6. Order confirmed → user can view it in profile</p>
      </div>

      <h2>Database Structure (MongoDB Collections)</h2>
      <div
        style={{
          backgroundColor: "#fff9e6",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <h4>📋 users collection</h4>
        <pre
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderLeft: "4px solid #ff9800",
            overflow: "auto",
          }}
        >{`{
  uid: "user123",
  name: "John Artist",
  email: "john@example.com",
  role: "artist" or "buyer",
  profilePic: "https://...",
  bio: "Digital illustrator",
  joinedDate: Timestamp
}`}</pre>

        <h4>🖼️ artworks collection</h4>
        <pre
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderLeft: "4px solid #ff9800",
            overflow: "auto",
          }}
        >{`{
  id: "art123",
  title: "Space Explorer",
  description: "Digital illustration...",
  imageUrl: "https://imgur.com/...",
  artistId: "user123",
  price: 29.99,
  category: "digital-art",
  tags: ["space", "sci-fi"],
  uploadedDate: Timestamp,
  salesCount: 5
}`}</pre>

        <h4>🛒 orders collection</h4>
        <pre
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderLeft: "4px solid #ff9800",
            overflow: "auto",
          }}
        >{`{
  id: "order123",
  buyerId: "user456",
  artworkId: "art123",
  artistId: "user123",
  price: 29.99,
  status: "completed",
  stripePaymentId: "pi_...",
  purchasedDate: Timestamp
}`}</pre>
      </div>

      <hr style={{ marginTop: 40, marginBottom: 40 }} />

      <h2>⏱️ My 4-Day Build Plan</h2>
      <p style={{ color: "#d32f2f", fontWeight: "bold" }}>
        Goal: Launch a working MVP in 4 days. Then iterate, add features,
        optimize.
      </p>

      <h3>📅 DAY 1: Authentication Setup (8 Hours)</h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}
      >
        <tbody>
          <tr style={{ backgroundColor: "#e3f2fd" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
                width: "15%",
              }}
            >
              9 AM - 9:30 AM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Create Firebase project, get API keys
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc", width: "20%" }}>
              Firebase Console
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              9:30 AM - 11 AM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Setup Firebase config in React, add .env file
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/config/firebase.js
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              11 AM - 1 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Create AuthContext for global user state
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Context/AuthContext.jsx
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              1 PM - 3 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build Signup page (email + password)
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Auth/Signup.jsx
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              3 PM - 4:30 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build Login page + Google OAuth button
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Auth/Login.jsx
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              4:30 PM - 5:30 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Save user profile to MongoDB, test login flow
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Test in browser
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              5:30 PM - 6 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Deploy to Vercel/Netlify, verify it works
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Vercel deploy
            </td>
          </tr>
        </tbody>
      </table>
      <p
        style={{
          color: "#2e7d32",
          backgroundColor: "#e8f5e9",
          padding: 12,
          borderRadius: 5,
        }}
      >
        ✅ <strong>End of Day 1:</strong> Users can sign up/login with email and
        Google. User data saved to MongoDB.
      </p>

      <h3>📅 DAY 2: Browse & Homepage (8 Hours)</h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}
      >
        <tbody>
          <tr style={{ backgroundColor: "#e3f2fd" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
                width: "15%",
              }}
            >
              9 AM - 10 AM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build Navbar with nav links and logout button
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc", width: "20%" }}>
              src/Components/Navbar/Navbar.jsx
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              10 AM - 11 AM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Create Homepage with hero section + featured art
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Home/Home.jsx
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              11 AM - 12 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Add 20-30 mock artworks to MongoDB
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              MongoDB Atlas dashboard
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              12 PM - 2 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build AllArts page - grid of artwork cards, fetch from DB
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Browse/AllArts.jsx
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              2 PM - 3:30 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Add search bar + category filter
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Search & filter logic
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              3:30 PM - 5 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build artwork detail page (click card → see full details)
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Browse/ArtworkDetail.jsx
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              5 PM - 6 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Make it mobile-responsive, deploy
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              CSS media queries
            </td>
          </tr>
        </tbody>
      </table>
      <p
        style={{
          color: "#2e7d32",
          backgroundColor: "#e8f5e9",
          padding: 12,
          borderRadius: 5,
        }}
      >
        ✅ <strong>End of Day 2:</strong> Full browse page with search &
        filters. Users can explore all artwork.
      </p>

      <h3>📅 DAY 3: Upload & Artist Features (8 Hours)</h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}
      >
        <tbody>
          <tr style={{ backgroundColor: "#e3f2fd" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
                width: "15%",
              }}
            >
              9 AM - 10:30 AM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Create Upload form (title, description, image URL, price)
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc", width: "20%" }}>
              src/Components/Upload/UploadPage.jsx
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              10:30 AM - 12 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Save artwork to MongoDB with artist ID
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              MongoDB write function
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              12 PM - 2 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build artist dashboard (show my uploads, edit, delete)
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Profile/Dashboard.jsx
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              2 PM - 4 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build public artist profile page
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Profile/ArtistProfile.jsx
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              4 PM - 5:30 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build buyer profile (purchase history)
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Profile/BuyerProfile.jsx
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              5:30 PM - 6 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Test & deploy everything
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Vercel deploy
            </td>
          </tr>
        </tbody>
      </table>
      <p
        style={{
          color: "#2e7d32",
          backgroundColor: "#e8f5e9",
          padding: 12,
          borderRadius: 5,
        }}
      >
        ✅ <strong>End of Day 3:</strong> Artists can upload work. Public
        profiles working. Buyers can see artist portfolio.
      </p>

      <h3>📅 DAY 4: Payments & Shopping Cart (8 Hours)</h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30 }}
      >
        <tbody>
          <tr style={{ backgroundColor: "#e3f2fd" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
                width: "15%",
              }}
            >
              9 AM - 10 AM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Create CartContext (add/remove items, calculate total)
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc", width: "20%" }}>
              src/Context/CartContext.jsx
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              10 AM - 11:30 AM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build Cart page UI
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Cart/Cart.jsx
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              11:30 AM - 12:30 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Sign up for Stripe account, get API keys
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Stripe Dashboard
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              12:30 PM - 2:30 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Build Checkout page with Stripe integration
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              src/Components/Checkout/CheckoutPage.jsx
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              2:30 PM - 4 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Handle payment success → create order in MongoDB
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Payment webhook
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              4 PM - 5:30 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Test payment flow (use Stripe test card: 4242 4242 4242 4242)
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Browser testing
            </td>
          </tr>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <td
              style={{
                padding: 12,
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              5:30 PM - 6 PM
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Final deployment & launch 🚀
            </td>
            <td style={{ padding: 12, border: "1px solid #ccc" }}>
              Vercel final deploy
            </td>
          </tr>
        </tbody>
      </table>
      <p
        style={{
          color: "#2e7d32",
          backgroundColor: "#e8f5e9",
          padding: 12,
          borderRadius: 5,
        }}
      >
        ✅ <strong>End of Day 4:</strong> MVP COMPLETE! Users can browse,
        upload, and buy art. Payments working. Ready to launch!
      </p>

      <hr style={{ marginTop: 40, marginBottom: 40 }} />

      <h2>💡 Quick Notes for Myself</h2>
      <ul>
        <li>
          Use Imgur or Cloudinary for image hosting (users paste image URLs)
        </li>
        <li>Test Stripe payments with card: 4242 4242 4242 4242</li>
        <li>
          Remember to add ProtectedRoute component so only logged-in users can
          upload
        </li>
        <li>
          Deploy with Vercel - just connect GitHub repo, auto-deploys on push
        </li>
        <li>
          Use React Router for page navigation (Home, Browse, Upload, Cart,
          Profile)
        </li>
        <li>Cache artworks in Context to avoid repeated DB fetches</li>
        <li>Add loading spinners while fetching data</li>
      </ul>

      <h2>📊 After Day 4 - What's Next?</h2>
      <ul>
        <li>
          <strong>Week 2:</strong> Add reviews/ratings system, wishlist feature,
          email notifications
        </li>
        <li>
          <strong>Week 3:</strong> Create admin dashboard (monitor sales, user
          count, revenue)
        </li>
        <li>
          <strong>Week 4:</strong> Optimize for scale (add pagination, caching,
          indexing)
        </li>
        <li>
          <strong>Month 2:</strong> Analytics, artist earnings dashboard,
          payment report
        </li>
      </ul>

      <p
        style={{
          marginTop: 30,
          padding: 15,
          backgroundColor: "#fff3e0",
          borderLeft: "4px solid #ff9800",
          borderRadius: 5,
        }}
      >
        <strong>⚡ Ready to start?</strong> I'll first scaffold Firebase config
        and Auth setup. Then we build from there step by step. Each feature will
        be tested before moving to the next one.
      </p>
    </section>
  );
};

export default Requirement;
