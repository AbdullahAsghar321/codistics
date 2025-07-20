"use client";
import { useState } from "react";

export default function AdminPage() {
  const [formType, setFormType] = useState("service");
  const [formData, setFormData] = useState({
    // Common fields
    title: "",
    description: "",
    
    // Project fields
    category: "",
    tags: "",
    image: "",
    link: "",
    
    // Service fields
    summary: "",
    icon: "",
    href: "",
    
    // Team fields
    name: "",
    role: "",
    skills: "",
    
    // User fields
    email: "",
    password: "",
    
    // Blog fields
    excerpt: "",
    author: "", // This should be a valid User ID
    date: "",
    blogCategory: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url, body;

    switch(formType) {
      case "project":
        url = "/api/projects";
        body = {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          tags: formData.tags.split(","),
          image: formData.image,
          link: formData.link,
        };
        break;
      case "service":
        url = "/api/services";
        body = {
          title: formData.title,
          summary: formData.summary,
          description: formData.description,
          icon: formData.icon,
          href: formData.href,
        };
        break;
      case "team":
        url = "/api/teams";
        body = {
          name: formData.name,
          role: formData.role,
          description: formData.description,
          skills: formData.skills.split(","),
        };
        break;
      case "user":
        url = "/api/users";
        body = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        break;
      case "blog":
        url = "/api/blogs";
        body = {
          title: formData.title,
          excerpt: formData.excerpt,
          author: formData.author, // This should be a valid User ID
          date: formData.date || new Date().toISOString(),
          category: formData.blogCategory,
          image: formData.image,
        };
        break;
      default:
        return;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert(`${formType} added successfully!`);
      setFormData({
        title: "",
        description: "",
        category: "",
        tags: "",
        image: "",
        link: "",
        summary: "",
        icon: "",
        href: "",
        name: "",
        role: "",
        skills: "",
        email: "",
        password: "",
        excerpt: "",
        author: "",
        date: "",
        blogCategory: ""
      });
    } else {
      const err = await res.json();
      alert(`Error: ${err.error}`);
    }
  };

  // Fetch users to populate author dropdown
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

  const loadUsers = async () => {
    if (!usersLoaded && formType === "blog") {
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
          setUsersLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    }
  };

  // Load users when blog form is selected
  if (formType === "blog" && !usersLoaded) {
    loadUsers();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFormType("service")}
          className={`px-4 py-2 rounded ${
            formType === "service" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Add Service
        </button>
        <button
          onClick={() => setFormType("project")}
          className={`px-4 py-2 rounded ${
            formType === "project" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Add Project
        </button>
        <button
          onClick={() => setFormType("team")}
          className={`px-4 py-2 rounded ${
            formType === "team" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Add Team
        </button>
        <button
          onClick={() => setFormType("user")}
          className={`px-4 py-2 rounded ${
            formType === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Add User
        </button>
        <button
          onClick={() => setFormType("blog")}
          className={`px-4 py-2 rounded ${
            formType === "blog" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Add Blog
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(formType === "project" || formType === "service" || formType === "blog") && (
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        )}

        {formType === "project" && (
          <>
            <input
              type="text"
              placeholder="Category"
              className="w-full border p-2"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              className="w-full border p-2"
              value={formData.tags || ""}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border p-2"
              value={formData.image || ""}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Link"
              className="w-full border p-2"
              value={formData.link || ""}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              required
            />
          </>
        )}

        {formType === "service" && (
          <>
            <input
              type="text"
              placeholder="Summary"
              className="w-full border p-2"
              value={formData.summary || ""}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Icon (emoji or class)"
              className="w-full border p-2"
              value={formData.icon || ""}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Link /href"
              className="w-full border p-2"
              value={formData.href || ""}
              onChange={(e) =>
                setFormData({ ...formData, href: e.target.value })
              }
              required
            />
          </>
        )}

        {formType === "team" && (
          <>
            <input
              type="text"
              placeholder="Team Name"
              className="w-full border p-2"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
           <select
  className="w-full border p-2"
  value={formData.role || ""}
  onChange={(e) =>
    setFormData({ ...formData, role: e.target.value })
  }
  required
>
  <option value="" disabled>Select Role</option>
  <option value="admin">Admin</option>
  <option value="member">Member</option>
  <option value="guest">Guest</option>
</select>

            <input
              type="text"
              placeholder="Skills (comma-separated)"
              className="w-full border p-2"
              value={formData.skills || ""}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              required
            />
          </>
        )}

        {formType === "user" && (
          <>
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </>
        )}

        {formType === "blog" && (
          <>
            <input
              type="text"
              placeholder="Excerpt"
              className="w-full border p-2"
              value={formData.excerpt || ""}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              required
            />
            <select
              className="w-full border p-2"
              value={formData.author || ""}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            >
              <option value="">Select Author</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            <input
              type="date"
              placeholder="Date"
              className="w-full border p-2"
              value={formData.date || ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full border p-2"
              value={formData.blogCategory || ""}
              onChange={(e) =>
                setFormData({ ...formData, blogCategory: e.target.value })
              }
              required
            />
            <input
      type="text"
      placeholder="Image URL"
      className="w-full border p-2"
      value={formData.image || ""}
      onChange={(e) =>
        setFormData({ ...formData, image: e.target.value })
      }
      required
    />
          </>
        )}

        {(formType !== "user") && (
          <textarea
            placeholder="Description"
            className="w-full border p-2"
            rows={4}
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required={formType !== "user"}
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit {formType}
        </button>
      </form>
    </div>
  );
}