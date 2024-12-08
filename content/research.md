---
title: My Research
---

# Fixing Label Smoothing for Improved Feature Representation

Label Smoothing: it's the training trick that helps neural networks avoid getting too cocky about their predictions. Sounds like a good idea, right? After all, it prevents over-confidence and boosts generalization, making it a must-have for tasks like Image Recognition and Neural Machine Translation. However, as with all great things, Label Smoothing has a flaw. While it helps the network stay humble, it also creates overly compact clusters in the feature space, essentially "erasing" the unique traits of individual examples. This can mess with the representation learning, leaving our model scratching its head in confusion.

But don't worry—I’ve got a solution! Enter Max Suppression (MaxSup). MaxSup steps in to save the day by keeping that all-important regularization effect in play, no matter how right or wrong the predictions are. By isolating the problem into two distinct parts—a regularization term and an error-enhancement term—we reveal the sneaky issue that Label Smoothing was hiding: it actually makes the network _too_ confident when it gets things wrong.

MaxSup to the rescue! We show that, unlike Label Smoothing, MaxSup helps the model create better separation between classes while encouraging more variation within each class. It also maintained significantly higher downstream task performance for linear transfer and KNN. In layman's terms: it teaches the network to be confidently wrong _in a more useful way_ and helps it differentiate between categories with style. Experiments on Image Classification and Machine Translation tasks back up our claim, proving that MaxSup is indeed a better way to train neural networks.


## Human-Aware Vision-and-Language Navigation: Bridging Simulation to Reality with Dynamic Human Interactions

Vision-and-Language Navigation (VLN): the goal is to create those cool robots you see in sci-fi movies that can navigate real-world environments based on human instructions. Simple, right? Well, not exactly. Current VLN systems are a bit… stuck in the past. They rely on static environments and perfect expert supervision, which is fine in theory, but it’s about as useful in the real world as a paper map in a GPS age.

So, what's the fix? Introducing **Human-Aware Vision-and-Language Navigation (HA-VLN)**—a shiny new twist on VLN that embraces the messiness of human behavior. Instead of sticking to controlled, static settings, we throw in the chaos of _actual_ human activities. The kicker: we also relax the assumptions that have been holding us back from real-world applications.

To make this all possible, we created the **Human-Aware 3D (HA3D) simulator**—a hybrid beast that combines dynamic human activities with the Matterport3D dataset. But we didn’t stop there; we also present the **Human-Aware Room-to-Room (HA-R2R)** dataset, a revamped version of the R2R dataset, now with real human activity descriptions. After all, who better to teach our robots how to navigate human spaces than, well, humans?

Of course, navigating dynamic environments filled with humans isn’t easy, so we developed two _next-gen_ agents to handle the job: the **Expert-Supervised Cross-Modal (VLN-CM)** agent and the **Non-Expert-Supervised Decision Transformer (VLN-DT)** agent. These agents utilize fancy techniques like cross-modal fusion and diverse training strategies to help them navigate these dynamic, human-filled environments without turning everything into a disaster.

We conducted a thorough evaluation—because who doesn't love metrics?—that included a focus on human activities. Our analysis of HA-VLN’s challenges underscores the need for more research to make these systems more robust and adaptable in the real world. In short, we’re setting the stage for more realistic, human-friendly robots that can navigate spaces like a pro. Ready for the future? We are.

This work also provides some solid benchmarks and insights to guide future research into embodied AI and Sim2Real transfer, offering a clear path for developing more applicable VLN systems for human-populated environments.