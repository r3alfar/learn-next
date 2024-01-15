
import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})
const db = sql('meals.sqlite')

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug){
 return db.prepare(`SELECT * FROM meals where slug = ?`).get(slug);
}

export async function saveMeal(meal){
  meal.slug = slugify(meal.title, {lower:true});
  meal.instructions = xss(meal.instructions);
  console.log("file Content Type: ", meal.image.type);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  try {
    s3.putObject({
      Bucket: 'farrel-nextjs-demo-users-image',
      Key: `images/${fileName}`,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type
    });
  
  } catch(err){
    console.log("Error putobject Details: ",err)
  }
  
  meal.image = fileName;

  db.prepare(`
    INSERT INTO meals
      (slug, title, creator, creator_email, instructions, image, summary)
    VALUES (
      $slug,
      $title,
      $creator,
      $creator_email,
      $instructions,
      $image,
      $summary
    )
  `).run(meal);
}