import Story from "../../models/Story";

const toggleActiveStatus = (id) => {
        const story = await Story.findById(id);
        if (!story) {
          return null;
        }
    
        story.isActive = !story.isActive;
        return story.save();
     );
}
 
export default toggleActiveStatus;