# Define a simple Book class

class Book:
    def __init__(self, title, pages):
        # store title and pages on the object
        self.title = title
        self.pages = pages

    def description(self):
        # return a string like "Python for Hackers (120 pages)"
        return f"{self.title} ({self.pages} pages)"


# demo / sample usage
book1 = Book("Python for Hackers", 120)
book2 = Book("Network Secrets", 300)

print(book1.description())
print(book2.description())
