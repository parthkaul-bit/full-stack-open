import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Blog from "./Blog";
import blogs from "../services/blogs";
import Create from "./Create";

vi.mock("../services/blogs");

describe("<Blog />", () => {
  let blog;
  let user;
  let mockFetchBlogs;

  beforeEach(() => {
    blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: [
        {
          name: "Test User",
          id: "testid123",
        },
      ],
    };

    user = {
      id: "testid123",
      token: "testtoken",
    };

    mockFetchBlogs = vi.fn();

    blogs.updateOne.mockResolvedValue({});
  });

  test("renders blog title and author but not URL or likes by default", () => {
    render(<Blog blog={blog} user={user} fetchBlogs={mockFetchBlogs} />);

    expect(
      screen.getByText(`${blog.title} ${blog.author}`)
    ).toBeInTheDocument();
    expect(screen.queryByText(`URL: ${blog.url}`)).not.toBeVisible();
    expect(screen.queryByText(`Likes: ${blog.likes}`)).not.toBeVisible();
  });

  test("shows blog's URL and likes when the view button is clicked", () => {
    render(<Blog blog={blog} user={user} fetchBlogs={mockFetchBlogs} />);

    const viewButton = screen.getByText("view");
    fireEvent.click(viewButton);

    expect(screen.getByText(`URL: ${blog.url}`)).toBeVisible();
    expect(screen.getByText(`Likes: ${blog.likes}`)).toBeVisible();
  });

  test("clicking the like button twice calls the event handler twice", async () => {
    render(<Blog blog={blog} user={user} fetchBlogs={mockFetchBlogs} />);

    const viewButton = screen.getByText("view");
    fireEvent.click(viewButton);

    const likeButton = screen.getByText("like");

    await fireEvent.click(likeButton);
    await fireEvent.click(likeButton);

    await waitFor(() => {
      expect(blogs.updateOne).toHaveBeenCalledTimes(2);
      expect(mockFetchBlogs).toHaveBeenCalledTimes(2);
    });
  });

  test("form calls event handler with right details when a new blog is created", async () => {
    let mockToggleVisibility;
    let user;

    mockToggleVisibility = vi.fn();
    user = {
      token: "testtoken",
    };
    blogs.postOne.mockResolvedValue({
      title: "Test Blog",
      author: "Test Author",
      url: "http://test.com",
    });

    render(<Create user={user} toggleVisibility={mockToggleVisibility} />);

    const titleInput = screen.getByPlaceholderText("Title");
    const authorInput = screen.getByPlaceholderText("Author");
    const urlInput = screen.getByPlaceholderText("URL");
    const submitButton = screen.getByText("add");

    fireEvent.change(titleInput, { target: { value: "Test Blog" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(urlInput, { target: { value: "http://test.com" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(blogs.postOne).toHaveBeenCalledWith(
        { title: "Test Blog", author: "Test Author", url: "http://test.com" },
        "testtoken"
      );
    });

    expect(mockToggleVisibility).toHaveBeenCalled();
  });
});
