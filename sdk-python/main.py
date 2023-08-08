import openai
def generate_prompt(animal: str):
    return f"""Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {animal.capitalize()}
Names:"""

response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt("Mouse"),
            temperature=0.6,
        )

