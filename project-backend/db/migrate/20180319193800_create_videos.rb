class CreateVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :videos do |t|
      t.float :played
      t.float :playedSeconds
      t.boolean :playing
      t.string :url
      t.integer :chatroom_id
      t.timestamps
    end
  end
end
