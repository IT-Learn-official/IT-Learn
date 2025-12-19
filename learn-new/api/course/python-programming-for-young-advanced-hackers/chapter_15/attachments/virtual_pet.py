# Create a simple virtual Pet class

class Pet:
    def __init__(self, name):
        self.name = name
        self.hunger = 0  # 0 means full

    def feed(self, amount):
        # reduce hunger but not below 0
        self.hunger = max(0, self.hunger - amount)

    def status(self):
        # return a message based on current hunger level
        if self.hunger == 0:
            return f"{self.name} is full."
        elif 1 <= self.hunger <= 5:
            return f"{self.name} is a bit hungry."
        else:
            return f"{self.name} is very hungry!"


# demo / sample usage
pet = Pet("Byte")

# make the pet hungry
pet.hunger = 6
print("Before feeding:", pet.status())

# feed the pet
pet.feed(3)
print("After feeding once:", pet.status())

pet.feed(5)
print("After feeding again:", pet.status())
